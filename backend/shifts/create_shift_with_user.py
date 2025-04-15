from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import get_user_model
from .models import Shift
from .serializers import ShiftSerializer

User = get_user_model()

@api_view(['POST'])
@permission_classes([permissions.IsAdminUser])  # Optionally change to IsAdminUser if only admins should assign shifts
def create_shift_with_user(request):
    """
    Create a shift for an existing user.
    The user must already exist (created via the signup page).
    This ensures that if a shift is assigned to a user, only that user sees it.
    """
    email = request.data.get('email')
    if not email:
        return Response({"error": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Look up the user by email
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(
            {"error": "User not found. Please sign up first."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Build shift data referencing the found user's ID
    shift_data = {
        'date': request.data.get('date'),
        'start_time': request.data.get('start_time'),
        'end_time': request.data.get('end_time'),
        'employee': user.id,  # This assigns the shift to the specified user
        'location': request.data.get('location'),
        'status': request.data.get('status', 'pending'),  # Default to 'pending' if not provided
    }

    serializer = ShiftSerializer(data=shift_data)
    if serializer.is_valid():
        shift = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
