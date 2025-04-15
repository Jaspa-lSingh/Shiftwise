from django.urls import path
from . import views
from .views import send_admin_otp, verify_admin_otp, send_employee_otp, verify_employee_otp
urlpatterns = [
    path("send-admin-otp/", views.send_admin_otp, name="send_admin_otp"),
    path("verify-admin-otp/", views.verify_admin_otp, name="verify_admin_otp"),
     path("send-employee-otp/", send_employee_otp, name="send-employee-otp"),
    path("verify-employee-otp/", verify_employee_otp, name="verify-employee-otp"),
]
