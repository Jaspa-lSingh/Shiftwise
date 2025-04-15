from django.db import models
from django.conf import settings

class Inquiry(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('answered', 'Answered'),
    )

    employee = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='inquiries'
    )
    subject = models.CharField(max_length=255)
    message = models.TextField()
    answer = models.TextField(blank=True, null=True)  # Admin reply field
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Inquiry from {self.employee.email}: {self.subject}"

    def save(self, *args, **kwargs):
        """
        Automatically update status to 'answered' if an answer is provided.
        """
        if self.answer and self.status == 'pending':
            self.status = 'answered'
        super().save(*args, **kwargs)
