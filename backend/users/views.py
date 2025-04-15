from rest_framework import generics, permissions, status, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import UserSerializer

User = get_user_model()

class AdminUserListView(generics.ListAPIView):
    """
    Lists all registered users (admin-only).
    Allows searching by 'email', 'first_name', or 'last_name' via ?search=<query>.
    Example: GET /api/users/admin/users/?search=john
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

    # Add DRF SearchFilter for query-based searching
    filter_backends = [filters.SearchFilter]
    search_fields = ["email", "first_name", "last_name"]  # Adjust if needed (e.g., ["email", "name"])

class AdminUserDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Allows admin to retrieve, update, or delete a single user by ID.
    Example: PATCH /api/users/admin/users/<id>/
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

@api_view(["GET", "PATCH"])
@permission_classes([permissions.IsAuthenticated])
def profile(request):
    """
    Returns or updates the currently logged-in user's profile.
    Example: GET /api/users/profile/
             PATCH /api/users/profile/
    """
    if request.method == "GET":
        serializer = UserSerializer(request.user, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == "PATCH":
        serializer = UserSerializer(request.user, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
