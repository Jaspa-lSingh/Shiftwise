from rest_framework import generics, permissions
from .models import SwapShiftRequest
from .serializers import SwapShiftRequestSerializer




# Employee: Create and view own swap requests
class EmployeeSwapRequestView(generics.ListCreateAPIView):
    serializer_class = SwapShiftRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SwapShiftRequest.objects.filter(requested_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(requested_by=self.request.user)

# Admin: View all swap requests
class AdminSwapRequestListView(generics.ListAPIView):
    queryset = SwapShiftRequest.objects.all().order_by('-created_at')
    serializer_class = SwapShiftRequestSerializer
    permission_classes = [permissions.IsAdminUser]

# Admin: Approve/Deny a specific request
class AdminSwapRequestUpdateView(generics.UpdateAPIView):
    queryset = SwapShiftRequest.objects.all()
    serializer_class = SwapShiftRequestSerializer
    permission_classes = [permissions.IsAdminUser]
