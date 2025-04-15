from django.db import models
from django.conf import settings

class LeaveRequest(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("denied", "Denied"),
    ]

    SHIFT_CHOICES = [
        ("morning", "Morning"),
        ("afternoon", "Afternoon"),
        ("night", "Night"),
    ]

    employee = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="leave_requests"
    )
    shift_date = models.DateField()  # ✅ Date of shift employee wants to take leave
    shift_time = models.CharField(
        max_length=20, choices=SHIFT_CHOICES
    )  # ✅ Predefined shift times to avoid errors
    location = models.CharField(
        max_length=255, null=True, blank=True
    )  # ✅ Added location field for accuracy
    reason = models.TextField()  # ✅ Reason for leave
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.employee.email} - {self.shift_date} - {self.get_status_display()} - {self.location}"

    class Meta:
        unique_together = ["employee", "shift_date", "shift_time", "location"]  # ✅ Prevents duplicate leave requests for the same shift at the same location
