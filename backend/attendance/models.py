from django.db import models
from django.contrib.auth import get_user_model
from shifts.models import Shift  # Ensure this import matches your project structure

User = get_user_model()

class Attendance(models.Model):
    """
    Records an employee's attendance for a specific shift.
    """
    shift = models.ForeignKey(Shift, on_delete=models.CASCADE, related_name='attendances')
    employee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='attendances')
    clock_in_time = models.DateTimeField(null=True, blank=True)
    clock_out_time = models.DateTimeField(null=True, blank=True)
    clock_in_location = models.CharField(max_length=255, blank=True)
    clock_out_location = models.CharField(max_length=255, blank=True)
    total_hours = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Attendance for {self.employee.email} - Shift #{self.shift.id}"
    
    def save(self, *args, **kwargs):
        """
        Compute total_hours when clock_out_time is set.
        """
        if self.clock_in_time and self.clock_out_time:
            duration = self.clock_out_time - self.clock_in_time
            hours = duration.total_seconds() / 3600
            self.total_hours = round(hours, 2)
        super().save(*args, **kwargs)
    
    class Meta:
        ordering = ['-created_at']
