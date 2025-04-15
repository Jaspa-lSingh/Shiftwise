# shifts/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from .models import Shift
from notifications.models import Notification

@receiver(post_save, sender=Shift)
def shift_created_notification(sender, instance, created, **kwargs):
    if created:
        # Create notification for the employee and/or admin
        Notification.objects.create(
            recipient=instance.employee,
            notification_type='shift',
            message=f"A new shift has been created for you on {instance.date}."
        )
