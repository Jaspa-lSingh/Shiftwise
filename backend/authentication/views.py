import jwt
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from rest_framework.views import APIView

from .serializers import UserSerializer, RegisterSerializer, LoginSerializer

User = get_user_model()

# -------------------------
# Admin-Only Login
# -------------------------
from django.core.cache import cache
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import LoginSerializer
import jwt  # Only if you're decoding for logging/debugging

class AdminLoginView(generics.GenericAPIView):
    """
    Admin Login Endpoint with OTP Verification.
    Expects: email, password, id_code.
    Enforces: user.is_staff == True AND OTP is verified.
    """
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        email = data.get("email")

        # ✅ Enforce OTP verification before login
        is_verified = cache.get(f"verified_admin_{email}")
        if not is_verified:
            return Response(
                {"detail": "OTP verification required before login"},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data.get('user')

        # ✅ Admin-only check
        if not user.is_staff:
            return Response(
                {"detail": "Not an admin user."},
                status=status.HTTP_403_FORBIDDEN
            )

        # ✅ Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        # ✅ Clean up cache
        cache.delete(f"verified_admin_{email}")
        cache.delete(f"admin_otp_{email}")

        # (Optional) Log token payload
        try:
            decoded_payload = jwt.decode(access_token, options={"verify_signature": False})
            print("Admin Login - Decoded JWT Payload:", decoded_payload)
        except Exception as e:
            print("Error decoding token (Admin Login):", e)

        return Response({
            "refresh": str(refresh),
            "access": access_token,
        }, status=status.HTTP_200_OK)

# -------------------------
# Employee (or General) Login
# -------------------------
from django.core.cache import cache

class EmployeeLoginView(generics.GenericAPIView):
    """
    Employee Login Endpoint:
    Expects the same credentials (email, password, id_code).
    OTP verification must be completed before login.
    """
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")

        # Check if OTP is verified
        is_verified = cache.get(f"verified_employee_{email}")
        if not is_verified:
            return Response(
                {"detail": "OTP verification required before login"},
                status=status.HTTP_403_FORBIDDEN
            )

        # Continue with normal login
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data.get('user')

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        # Optional: Debug JWT payload
        try:
            decoded_payload = jwt.decode(access_token, options={"verify_signature": False})
            print("Employee Login - Decoded JWT Payload:", decoded_payload)
        except Exception as e:
            print("Error decoding token (Employee Login):", e)

        # Clear OTP verification and cached code
        cache.delete(f"verified_employee_{email}")
        cache.delete(f"employee_otp_{email}")

        return Response({
            "refresh": str(refresh),
            "access": access_token,
        }, status=status.HTTP_200_OK)



# -------------------------
# Registration
# -------------------------
class RegisterView(APIView):
    """
    Registration Endpoint:
    Creates a new user, returns JWT tokens.
    """
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            # (Optional) Log decoded payload for debugging
            try:
                decoded_payload = jwt.decode(access_token, options={"verify_signature": False})
                print("Decoded JWT Payload after registration:", decoded_payload)
            except Exception as e:
                print("Error decoding token after registration:", e)

            return Response({
                "message": "User registered successfully",
                "access": access_token,
                "refresh": str(refresh),
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
