from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model
from .models import Shift
from .serializers import ShiftSerializer

User = get_user_model()

class ShiftListCreateView(generics.ListCreateAPIView):
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

class ShiftDetailView(generics.RetrieveUpdateDestroyAPIView):
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
    The user must already exist (i.e. be signed up).
    """
    email = request.data.get('email')
    if not email:
        return Response({"error": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(
            {"error": "User not found. Please sign up first."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Build shift data, assigning it to the found user
    shift_data = {
        "date": request.data.get("date"),
        "start_time": request.data.get("start_time"),
        "end_time": request.data.get("end_time"),
        "employee": user.id,  # Assign shift to this user
        "location": request.data.get("location"),
        "status": request.data.get("status", "pending")  # Default to "pending" if not provided
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
    Only admin users (is_staff=True) can access this endpoint.
    """
    queryset = Shift.objects.all()
    serializer_class = ShiftSerializer
    permission_classes = [permissions.IsAdminUser]
