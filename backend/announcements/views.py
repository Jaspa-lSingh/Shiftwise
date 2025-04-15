from rest_framework import generics, permissions
from .models import Announcement
from .serializers import AnnouncementSerializer

class AdminAnnouncementListView(generics.ListCreateAPIView):
    """
    Admin can list and create announcements.
    """
    queryset = Announcement.objects.all().order_by("-created_at")
    serializer_class = AnnouncementSerializer
    permission_classes = [permissions.IsAdminUser]

class AdminAnnouncementDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Admin can retrieve, update, or delete a specific announcement.
    """
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer
    permission_classes = [permissions.IsAdminUser]
class EmployeeAnnouncementListView(generics.ListAPIView):
    """
    Allows employees to list announcements.
    If you only want to show relevant ones, you can filter by recipients.
    Otherwise, show all.
    """
    serializer_class = AnnouncementSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # If announcements are for all employees:
        return Announcement.objects.all().order_by("-created_at")
