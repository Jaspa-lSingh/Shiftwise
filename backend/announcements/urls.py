from django.urls import path
from .views import AdminAnnouncementListView, AdminAnnouncementDetailView, EmployeeAnnouncementListView

urlpatterns = [
    path("admin/", AdminAnnouncementListView.as_view(), name="admin_announcement_list"),
    path("admin/<int:pk>/", AdminAnnouncementDetailView.as_view(), name="admin_announcement_detail"),
    path("", EmployeeAnnouncementListView.as_view(), name="employee_announcements"),
]
