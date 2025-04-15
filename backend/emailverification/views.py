import random
from django.core.cache import cache
from django.core.mail import send_mail
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes


@api_view(["POST"])
@permission_classes([AllowAny])
def send_admin_otp(request):
    email = request.data.get("email")
    if not email:
        return Response({"detail": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

    otp = random.randint(100000, 999999)
    cache.set(f"admin_otp_{email}", str(otp), timeout=300)

    send_mail(
        subject="Your Shiftwise Admin OTP",
        message=f"Your OTP for admin login is: {otp}",
        from_email=None,
        recipient_list=[email],
    )
    return Response({"detail": "OTP sent successfully"})


@api_view(["POST"])
@permission_classes([AllowAny])
def verify_admin_otp(request):
    email = request.data.get("email")
    otp = request.data.get("otp")

    if not email or not otp:
        return Response({"detail": "Email and OTP are required"}, status=status.HTTP_400_BAD_REQUEST)

    cached_otp = cache.get(f"admin_otp_{email}")
    if cached_otp == str(otp):
        cache.set(f"verified_admin_{email}", True, timeout=600)
        return Response({"verified": True})

    return Response({"verified": False}, status=status.HTTP_400_BAD_REQUEST)
@api_view(["POST"])
@permission_classes([AllowAny])
def send_employee_otp(request):
    email = request.data.get("email")
    if not email:
        return Response({"detail": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

    otp = random.randint(100000, 999999)
    cache.set(f"employee_otp_{email}", str(otp), timeout=300)  # 5 min

    send_mail(
        subject="Your Shiftwise OTP",
        message=f"Your OTP for login is: {otp}",
        from_email=None,
        recipient_list=[email],
    )
    return Response({"detail": "OTP sent to employee email"})


@api_view(["POST"])
@permission_classes([AllowAny])
def verify_employee_otp(request):
    email = request.data.get("email")
    otp = request.data.get("otp")

    if not email or not otp:
        return Response({"detail": "Email and OTP are required"}, status=status.HTTP_400_BAD_REQUEST)

    cached_otp = cache.get(f"employee_otp_{email}")
    if cached_otp == str(otp):
        cache.set(f"verified_employee_{email}", True, timeout=600)
        return Response({"verified": True})
    return Response({"verified": False}, status=status.HTTP_400_BAD_REQUEST)
