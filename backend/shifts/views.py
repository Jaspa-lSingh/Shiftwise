from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model
from .models import Shift
from .serializers import ShiftSerializer

User = get_user_model()

# -------------------- Admin Endpoints --------------------

class AdminShiftListCreateView(generics.ListCreateAPIView):
    """
    Admin Endpoint:
    - GET: List all shifts.
    - POST: Create a new shift.
    Only admin users (is_staff=True) can access this endpoint.
    """
    queryset = Shift.objects.all()
    serializer_class = ShiftSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

class AdminShiftDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Admin Endpoint:
    - GET: Retrieve a specific shift.
    - PUT/PATCH: Update a shift.
    - DELETE: Delete a shift.
    Only admin users (is_staff=True) can perform these actions.
    """
    queryset = Shift.objects.all()
    serializer_class = ShiftSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

@api_view(['POST'])
@permission_classes([permissions.IsAdminUser])
def create_shift_with_user(request):
    """
    Admin Endpoint:
    Create a shift for an existing user by email.
    The user must already exist (i.e., be signed up).
    """
    email = request.data.get('email')
    if not email:
        return Response({"error": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "User not found. Please sign up first."}, status=status.HTTP_400_BAD_REQUEST)
    
    shift_data = {
        "date": request.data.get("date"),
        "start_time": request.data.get("start_time"),
        "end_time": request.data.get("end_time"),
        "employee": user.id,  # Assign shift to this user
        "location": request.data.get("location"),
        "status": request.data.get("status", "pending"),  # Default to "pending" if not provided
    }
    
    serializer = ShiftSerializer(data=shift_data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminManageShiftsView(generics.ListAPIView):
    """
    Admin Endpoint:
    A custom view for managing shifts if additional logic is needed.
    Only admin users can access this endpoint.
    """
    queryset = Shift.objects.all()
    serializer_class = ShiftSerializer
    permission_classes = [permissions.IsAdminUser]


# -------------------- Employee Endpoints --------------------

class MyShiftsView(generics.ListAPIView):
    """
    Employee Endpoint:
    Lists only the shifts assigned to the logged-in employee.
    """
    serializer_class = ShiftSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Shift.objects.filter(employee=self.request.user)

class EmployeeShiftDetailView(generics.RetrieveUpdateAPIView):
    """
    Employee Endpoint:
    - GET: Retrieve a specific shift assigned to the employee.
    - PATCH: Allow employees to update their shift, but only to confirm it.
             Once a shift is confirmed, no further updates are allowed.
    """
    serializer_class = ShiftSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Ensure employees can access only their own shifts.
        return Shift.objects.filter(employee=self.request.user)

    def partial_update(self, request, *args, **kwargs):
        new_status = request.data.get("status")
        shift = self.get_object()
        # If the shift is already confirmed, prevent further updates.
        if shift.status == "employee_confirmed":
            return Response(
                {"error": "Shift is already confirmed. No further updates allowed."},
                status=status.HTTP_400_BAD_REQUEST
            )
        # Allow update only if the new status is "employee_confirmed"
        if new_status and new_status != "employee_confirmed":
            return Response(
                {"error": "Employees can only confirm their shift."},
                status=status.HTTP_403_FORBIDDEN
            )
        return super().partial_update(request, *args, **kwargs)
