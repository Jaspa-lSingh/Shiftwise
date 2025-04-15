from rest_framework import generics, permissions
from .models import CoverUpShift
from .serializers import CoverUpShiftSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from .models import CoverUpShift

class ListOpenCoverShiftsView(generics.ListAPIView):
    queryset = CoverUpShift.objects.filter(status="open")
    serializer_class = CoverUpShiftSerializer
    permission_classes = [permissions.IsAuthenticated]

class ClaimCoverShiftView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @transaction.atomic
    def post(self, request, pk):
        try:
            shift = CoverUpShift.objects.select_for_update().get(pk=pk, status="open")
            shift.claimed_by = request.user
            shift.status = "claimed"
            shift.save()
            return Response({"message": "Shift successfully claimed."})
        except CoverUpShift.DoesNotExist:
           return Response({"error": "This shift is already claimed or unavailable."}, status=status.HTTP_400_BAD_REQUEST)
class AdminCoverShiftListView(generics.ListAPIView):
    queryset = CoverUpShift.objects.all().order_by("-created_at")
    serializer_class = CoverUpShiftSerializer
    permission_classes = [permissions.IsAdminUser]
