from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Define a simple home view
def home_view(request):
    return JsonResponse({"message": "Welcome to ShiftWise API"})

def health_check(request):
    return JsonResponse({"status": "healthy"})

urlpatterns = [
    # Root endpoint
    path("", home_view, name="home"),
    # Admin site
    path("admin/", admin.site.urls),
    # Authentication endpoints (custom login/register)
    path("api/auth/", include("authentication.urls")),
    # Shifts endpoints
    path("api/shifts/", include("shifts.urls")),
    # User endpoints (including profile and admin user management)
    path("api/users/", include("users.urls")),
    # JWT token endpoints (if needed)
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # Payroll endpoints
    path("api/payroll/", include("payroll.urls")),
    # attendance api url
    path("api/attendance/", include("attendance.urls")),
    #Inquiries
    path('api/inquiries/', include('employee_inquiries.urls')),
    path('api/shiftswap/', include('shift_requests.urls')),
    path("api/email-verification/", include("emailverification.urls")),
    path("api/coverup/", include("coverup.urls")),
   path("api/swaps/", include("swaps.urls")),
path('api/', include('roles.urls')),


    #notification
    path('api/notifications/', include('notifications.urls')),
    #leave request
    path("api/leaves/", include("employee_leaves.urls")),
     #announcement 
    path('api/announcements/', include('announcements.urls')),
    path('api/health/', health_check, name='health_check'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
