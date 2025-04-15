from django.urls import path
from .views import clock_in, clock_out, AllAttendanceView, user_attendance, active_attendance

urlpatterns = [
    path('clock-in/', clock_in, name='clock_in'),
    path('clock-out/<int:pk>/', clock_out, name='clock_out'),
    path('all/', AllAttendanceView.as_view(), name='all_attendance'),
    path('user/<int:pk>/', user_attendance, name='user_attendance'),
    path('active/', active_attendance, name='active_attendance'),
]
