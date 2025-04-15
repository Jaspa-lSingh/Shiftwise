from django.urls import path
from .views import ListOpenCoverShiftsView, ClaimCoverShiftView, AdminCoverShiftListView

urlpatterns = [
    path('open/', ListOpenCoverShiftsView.as_view(), name='coverup_open_shifts'),
    path('claim/<int:pk>/', ClaimCoverShiftView.as_view(), name='coverup_claim_shift'),
    path('admin/', AdminCoverShiftListView.as_view(), name='coverup_admin_list'),
]
