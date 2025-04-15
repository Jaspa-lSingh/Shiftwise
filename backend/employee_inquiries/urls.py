from django.urls import path
from .views import EmployeeInquiryListCreateView, AdminInquiryListView, AdminInquiryUpdateView, AdminInquiryDeleteView 

urlpatterns = [
    # Employee: list and create inquiries.
    path('', EmployeeInquiryListCreateView.as_view(), name='employee_inquiry'),

    # ✅ FIXED: Changed `/api/inquiries/admin/` to `/api/admin/inquiries/`
    path('admin/', AdminInquiryListView.as_view(), name='admin_inquiry_list'),

    # ✅ FIXED: Changed `/api/inquiries/admin/<pk>/` to `/api/admin/inquiries/<pk>/`
    path('admin/<int:pk>/', AdminInquiryUpdateView.as_view(), name='admin_inquiry_update'),
    path('admin/delete/<int:pk>/', AdminInquiryDeleteView.as_view(), name='admin_inquiry_delete')
]
