from django.db import models
from django.conf import settings
from shifts.models import Shift  # Adjust this import if needed

class CoverUpShift(models.Model):
    STATUS_CHOICES = (
        ('open', 'Open'),
        ('claimed', 'Claimed'),
        ('cancelled', 'Cancelled'),
    )

    shift = models.ForeignKey(Shift, on_delete=models.CASCADE, related_name='cover_requests')
    posted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posted_cover_shifts')
    claimed_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='claimed_cover_shifts')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cover-up shift for {self.shift} - Status: {self.status}"
