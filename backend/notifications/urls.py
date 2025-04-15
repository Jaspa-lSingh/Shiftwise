from django.urls import path
from .views import NotificationListView, MarkNotificationReadView

urlpatterns = [
    path('', NotificationListView.as_view(), name='notification_list'),
    path('<int:id>/read/', MarkNotificationReadView.as_view(), name='mark_notification_read'),
]
