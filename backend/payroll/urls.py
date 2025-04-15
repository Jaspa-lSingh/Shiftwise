# payroll/urls.py
from django.urls import path
from .views import EmployeeListView, ProcessPayrollView

urlpatterns = [
    path('employees/', EmployeeListView.as_view(), name='employee-list'),
    path('process/', ProcessPayrollView.as_view(), name='process-payroll'),
]
