from rest_framework import status, permissions, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Attendance
from .serializers import AttendanceSerializer
from shifts.models import Shift

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def clock_in(request):
    """
    Creates an Attendance record for a given shift, setting clock_in_time and clock_in_location.
    
    Expects JSON:
      {
        "shift": <shift_id>,
        "clock_in_time": "<ISO timestamp>",
        "clock_in_location": "<latitude,longitude>"
      }
    """
    shift_id = request.data.get('shift')
    if not shift_id:
        return Response({"detail": "shift is required"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        shift = Shift.objects.get(id=shift_id)
    except Shift.DoesNotExist:
        return Response({"detail": "Shift not found"}, status=status.HTTP_404_NOT_FOUND)
    
    # Optional: Uncomment if you want to ensure the logged-in user is the assigned employee
    # if shift.employee != request.user:
    #     return Response({"detail": "You are not assigned to this shift."}, status=status.HTTP_403_FORBIDDEN)
    
    data = {
        "shift": shift_id,
        "employee": request.user.id,
        "clock_in_time": request.data.get('clock_in_time'),
        "clock_in_location": request.data.get('clock_in_location', "")
    }
    
    serializer = AttendanceSerializer(data=data)
    if serializer.is_valid():
        attendance = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
@permission_classes([permissions.IsAuthenticated])
def clock_out(request, pk):
    """
    Updates an existing Attendance record (by ID), setting clock_out_time and clock_out_location.
    
    Expects JSON:
      {
        "clock_out_time": "<ISO timestamp>",
        "clock_out_location": "<latitude,longitude>"
      }
    """
    try:
        attendance = Attendance.objects.get(id=pk)
    except Attendance.DoesNotExist:
        return Response({"detail": "Attendance record not found"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = AttendanceSerializer(attendance, data=request.data, partial=True)
    if serializer.is_valid():
        attendance = serializer.save()  # This triggers the model's save() to compute total_hours if applicable
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Optional: If you want an endpoint for admin to fetch all attendance records
class AllAttendanceView(generics.ListAPIView):
    """
    Returns all Attendance records. Accessible only to admin users.
    """
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = [permissions.IsAdminUser]
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_attendance(request, pk):
    if request.user.id != int(pk):
        return Response({"detail": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)
    records = Attendance.objects.filter(employee_id=pk)
    serializer = AttendanceSerializer(records, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def active_attendance(request):
    # Use filter() instead of get() to handle multiple records
    active_records = Attendance.objects.filter(
        employee=request.user, 
        clock_out_time__isnull=True
    ).order_by('-clock_in_time')  # Get most recent
    
    if active_records.exists():
        serializer = AttendanceSerializer(active_records.first())
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({"detail": "No active attendance found."}, status=status.HTTP_404_NOT_FOUND)