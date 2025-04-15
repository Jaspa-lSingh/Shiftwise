# File: shift_requests/models.py

from django.db import models
from django.conf import settings
from shifts.models import Shift  # Ensure Shift is defined in shifts/models.py

class ShiftSwapRequest(models.Model):
    """
    Represents a request by 'requester' to swap shifts with 'partner'.
    Each user has their own assigned shift (requester_shift, partner_shift).
    An admin can approve or reject the request by updating 'status'.
    """
    STATUS_CHOICES = [
        ('P', 'Pending'),
        ('A', 'Approved'),
        ('R', 'Rejected'),
    ]

    requester = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='swap_requests_made'
    )
    partner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='swap_requests_received'
    )
    requester_shift = models.ForeignKey(
        Shift,
        on_delete=models.CASCADE,
        related_name='swap_requests_made'
    )
    partner_shift = models.ForeignKey(
        Shift,
        on_delete=models.CASCADE,
        related_name='swap_requests_received'
    )
    reason = models.TextField(blank=True)
    status = models.CharField(
        max_length=1,
        choices=STATUS_CHOICES,
        default='P'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return (f"Swap Req: {self.requester.email} "
                f"(Shift {self.requester_shift.id}) ↔ "
                f"{self.partner.email} (Shift {self.partner_shift.id})")


class CoverUpShift(models.Model):
    """
    Represents a shift posted by 'posted_by' for cover-up.
    - status='O': open for employees to claim
    - status='C': claimed by an employee (claimed_by)
    - status='X': cancelled by admin
    """
    SHIFT_STATUS_CHOICES = [
        ('O', 'Open'),
        ('C', 'Claimed'),
        ('X', 'Cancelled'),
    ]

    shift = models.ForeignKey(
        Shift,
        on_delete=models.CASCADE,
        related_name='coverup_shifts'
    )
    posted_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='coverup_posted'
    )
    status = models.CharField(
        max_length=1,
        choices=SHIFT_STATUS_CHOICES,
        default='O'
    )
    claimed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='coverup_claimed'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"CoverUp Shift: {self.shift} - {self.get_status_display()}"
