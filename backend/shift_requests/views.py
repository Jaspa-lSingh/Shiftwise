# File: shift_requests/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

# Import your models and serializers
from .models import ShiftSwapRequest, CoverUpShift
from .serializers import ShiftSwapRequestSerializer, CoverUpShiftSerializer


# ===================== SHIFT SWAP REQUESTS =====================
class ShiftSwapRequestCreate(APIView):
    """
    POST -> A user submits a swap request with a partner.
            Requester is automatically set to request.user.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data.copy()
        # Auto-assign the 'requester' field to the logged-in user ID
        data['requester'] = request.user.id
        serializer = ShiftSwapRequestSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ShiftSwapRequestUpdate(APIView):
    """
    PATCH -> Admin can approve or reject a swap request by setting status='A' or 'R'.
    Example JSON: { "status": "A" }
    """
    permission_classes = [permissions.IsAdminUser]

    def patch(self, request, pk):
        try:
            swap_req = ShiftSwapRequest.objects.get(pk=pk)
        except ShiftSwapRequest.DoesNotExist:
            return Response({"detail": "Swap request not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ShiftSwapRequestSerializer(swap_req, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()  # e.g., status updated to 'A' or 'R'
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ===================== COVER-UP SHIFTS =====================
class CoverUpShiftCreateList(APIView):
    """
    GET  -> List all open cover-up shifts (status='O').
    POST -> Admin creates a new cover-up shift. 'posted_by' is set to request.user.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # For example, only list shifts with status 'O' (Open)
        open_shifts = CoverUpShift.objects.filter(status='O')
        serializer = CoverUpShiftSerializer(open_shifts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        # Only admins can post a new cover-up shift
        if not request.user.is_staff:
            return Response({"detail": "Only admins can post cover-up shifts."},
                            status=status.HTTP_403_FORBIDDEN)

        data = request.data.copy()
        data['posted_by'] = request.user.id
        serializer = CoverUpShiftSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CoverUpShiftClaim(APIView):
    """
    POST -> A user claims an open cover-up shift by ID, marking it as 'C' (claimed).
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            coverup = CoverUpShift.objects.get(pk=pk, status='O')
        except CoverUpShift.DoesNotExist:
            return Response({"detail": "Cover-up shift not found or not open."},
                            status=status.HTTP_404_NOT_FOUND)

        # Mark as claimed by current user
        coverup.status = 'C'
        coverup.claimed_by = request.user
        coverup.save()

        # Return the updated record
        serializer = CoverUpShiftSerializer(coverup)
        return Response(serializer.data, status=status.HTTP_200_OK)
