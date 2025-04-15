# shifts/models.py
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Shift(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('employee_confirmed', 'Employee Confirmed'),
        ('confirmed', 'Admin Confirmed'),
        ('cancelled', 'Cancelled'),
    )

    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    employee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shifts')
    location = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return f"{self.employee} - {self.date} ({self.start_time} to {self.end_time})"
from rest_framework import generics, permissions
from shifts.models import Shift
from shifts.serializers import ShiftSerializer

class AvailableShiftsForSwapView(generics.ListAPIView):
    """
    Returns shifts that are not assigned to the current user
    and can be requested for swap.
    """
    serializer_class = ShiftSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Shift.objects.exclude(user=user).filter(date__gte=date.today())
