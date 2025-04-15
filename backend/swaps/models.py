from django.db import models
from django.conf import settings
from shifts.models import Shift  # or wherever your Shift model is

class SwapShiftRequest(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("denied", "Denied"),
    ]

    requested_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="swap_requests"
    )
    give_up_shift = models.ForeignKey(
        Shift,
        on_delete=models.CASCADE,
        related_name="swap_given_requests"
    )
    desired_shift = models.ForeignKey(
        Shift,
        on_delete=models.CASCADE,
        related_name="swap_desired_requests"
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.requested_by.email} wants to swap {self.give_up_shift} → {self.desired_shift}"
