from django.urls import path
from .admin_views import (
    ShiftListCreateView,
    ShiftDetailView,
    AdminManageShiftsView,
    create_shift_with_user,
)
from .employee_views import MyShiftsView, EmployeeShiftDetailView
from .employee_views import AvailableShiftsForSwapView

urlpatterns = [
    # ----- Admin Endpoints -----
    path("", ShiftListCreateView.as_view(), name="shift_list_create"),
    path("<int:pk>/", ShiftDetailView.as_view(), name="shift_detail"),
    path("admin-shifts/", AdminManageShiftsView.as_view(), name="admin_manage_shifts"),
    path("create_shift_with_user/", create_shift_with_user, name="create_shift_with_user"),

    # ----- Employee Endpoints -----
    path("my-shifts/", MyShiftsView.as_view(), name="my_shifts"),
    path("my-shifts/<int:pk>/", EmployeeShiftDetailView.as_view(), name="employee_shift_detail"),


path("available-for-swap/", AvailableShiftsForSwapView.as_view(), name="shifts_available_for_swap"),

]
