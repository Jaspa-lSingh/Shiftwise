from rest_framework import generics, permissions, status, serializers
from rest_framework.response import Response
from .models import LeaveRequest
from .serializers import LeaveRequestSerializer

# ✅ Employee Leave Request View (List & Create)
class EmployeeLeaveRequestView(generics.ListCreateAPIView):
    serializer_class = LeaveRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Fetch only the leave requests made by the authenticated employee."""
        return LeaveRequest.objects.filter(employee=self.request.user)

    def perform_create(self, serializer):
        """Ensure employee cannot create duplicate leave requests for the same shift."""
        request_data = self.request.data
        print("Received Leave Request Data:", request_data)  # ✅ Debugging

        shift_date = request_data.get("shift_date")
        shift_time = request_data.get("shift_time")

        # ✅ Validate required fields
        if not shift_date or not shift_time:
            raise serializers.ValidationError({"error": "Shift date and time are required."})

        # ✅ Prevent duplicate requests for the same shift
        if LeaveRequest.objects.filter(
            employee=self.request.user,
            shift_date=shift_date,
            shift_time=shift_time
        ).exists():
            raise serializers.ValidationError({"error": "You have already requested leave for this shift."})

        serializer.save(employee=self.request.user)


# ✅ Admin Leave List View (To Show All Requests in Admin Panel)
class AdminLeaveListView(generics.ListAPIView):
    """Allows Admin to see all leave requests."""
    serializer_class = LeaveRequestSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        """Fetch all leave requests for the admin panel."""
        return LeaveRequest.objects.all()


class AdminLeaveApprovalView(generics.RetrieveUpdateDestroyAPIView):
    """
    Allows Admin to approve, deny, or delete leave requests.
    """
    queryset = LeaveRequest.objects.all()
    serializer_class = LeaveRequestSerializer
    permission_classes = [permissions.IsAdminUser]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        status_value = request.data.get("status", "").lower()

        valid_statuses = ["approved", "denied"]
        if status_value not in valid_statuses:
            return Response(
                {"error": f"Invalid status. Allowed values: {valid_statuses}."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Store status in lowercase to keep consistency
        instance.status = status_value
        instance.save()

        return Response(
            {
                "message": f"Leave request {status_value} successfully!",
                "data": LeaveRequestSerializer(instance).data,
            },
            status=status.HTTP_200_OK,
        )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({"message": "Leave request deleted successfully."}, status=status.HTTP_204_NO_CONTENT)