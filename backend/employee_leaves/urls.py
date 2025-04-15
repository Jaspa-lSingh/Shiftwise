from django.urls import path
from .views import EmployeeLeaveRequestView, AdminLeaveListView, AdminLeaveApprovalView

urlpatterns = [
    path("", EmployeeLeaveRequestView.as_view(), name="employee_leave_requests"),
    path("admin/", AdminLeaveListView.as_view(), name="admin_leave_list"),
    path("admin/<int:pk>/", AdminLeaveApprovalView.as_view(), name="admin_leave_approval"),
]
