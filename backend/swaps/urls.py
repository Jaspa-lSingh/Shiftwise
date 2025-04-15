from django.urls import path
from .views import (
    EmployeeSwapRequestView,
    AdminSwapRequestListView,
    AdminSwapRequestUpdateView
)

urlpatterns = [
    # Employee: list & create swap requests
    path('', EmployeeSwapRequestView.as_view(), name='employee_swap_request'),

    # Admin: list all requests
    path('admin/', AdminSwapRequestListView.as_view(), name='admin_swap_list'),

    # Admin: approve or deny specific request
    path('admin/<int:pk>/', AdminSwapRequestUpdateView.as_view(), name='admin_swap_update'),
]
