from rest_framework import generics, permissions
from .models import Shift
from .serializers import ShiftSerializer

class MyShiftsView(generics.ListAPIView):
    """
    Employee Endpoint:
    Lists only the shifts assigned to the currently logged-in user.
    """
    serializer_class = ShiftSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return only shifts that belong to the logged-in user
        return Shift.objects.filter(employee=self.request.user)

    def get_serializer_context(self):
        # Pass the request into the serializer context if needed
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context
