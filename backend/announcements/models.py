from django.db import models
from django.conf import settings

class Announcement(models.Model):
    """
    An announcement with:
    - topic: short title
    - message: text body
    - recipients: multiple users (ManyToMany)
    - created_at: timestamp
    - (optional) sender: if you want to track who posted it
    """
    topic = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    # If you want to track who posted it, uncomment and use this field:
    # sender = models.ForeignKey(
    #     settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="sent_announcements"
    # )

    recipients = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name="received_announcements",
        blank=True
    )

    def __str__(self):
        return f"{self.topic} ({self.pk})"
