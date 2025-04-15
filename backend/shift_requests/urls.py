from django.urls import path
from .views import ShiftSwapRequestCreate, ShiftSwapRequestUpdate, CoverUpShiftCreateList, CoverUpShiftClaim

urlpatterns = [
    path('', ShiftSwapRequestCreate.as_view(), name='shift_swap_create'),
    path('swap/<int:pk>/', ShiftSwapRequestUpdate.as_view(), name='shift_swap_update'),
    path('coverup/', CoverUpShiftCreateList.as_view(), name='coverup_list_create'),
    path('coverup/<int:pk>/claim/', CoverUpShiftClaim.as_view(), name='coverup_claim'),
]
