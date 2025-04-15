from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Shift
from .serializers import ShiftSerializer

class MyShiftsView(generics.ListAPIView):
    """
    Employee Endpoint:
    Lists only the shifts assigned to the logged-in employee.
    """
    serializer_class = ShiftSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return only shifts that belong to the logged-in user.
        return Shift.objects.filter(employee=self.request.user)

class EmployeeShiftDetailView(generics.RetrieveUpdateAPIView):
    """
    Employee Endpoint:
    - GET: Retrieve a specific shift assigned to the employee.
    - PATCH: Allow employees to update their shift status only to "employee_confirmed".
             Once a shift is confirmed, no further updates are allowed.
    """
    serializer_class = ShiftSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Ensure that an employee can access only their own shifts.
        return Shift.objects.filter(employee=self.request.user)

    def partial_update(self, request, *args, **kwargs):
        new_status = request.data.get("status")
        shift = self.get_object()
        # If the shift is already confirmed, block any further updates.
        if shift.status == "employee_confirmed":
            return Response(
                {"error": "Shift is already confirmed. No further updates allowed."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        # Allow update only if the new status is "employee_confirmed".
        if new_status and new_status != "employee_confirmed":
            return Response(
                {"error": "Employees can only confirm their shift."},
                status=status.HTTP_403_FORBIDDEN,
            )
        return super().partial_update(request, *args, **kwargs)
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
