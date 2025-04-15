from django.urls import path
from .views import AdminUserListView, AdminUserDetailView, profile

urlpatterns = [
    # Admin endpoints
    path("admin/users/", AdminUserListView.as_view(), name="admin_user_list"),
    path("admin/users/<int:pk>/", AdminUserDetailView.as_view(), name="admin_user_detail"),

    # Profile endpoint for the current user
    path("profile/", profile, name="profile"),
]
