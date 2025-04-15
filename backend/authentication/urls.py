from django.urls import path
from .views import AdminLoginView, EmployeeLoginView, RegisterView

urlpatterns = [
    path('admin-login/', AdminLoginView.as_view(), name='admin-login'),
    path('employee-login/', EmployeeLoginView.as_view(), name='employee-login'),
    path('auth/register/', RegisterView.as_view(), name='register'),
]
