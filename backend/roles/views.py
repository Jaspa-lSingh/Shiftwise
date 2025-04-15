from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from .models import Role, UserRoleAssignment
from .serializers import RoleSerializer, UserRoleAssignmentSerializer

class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [IsAdminUser]

class UserRoleAssignmentViewSet(viewsets.ModelViewSet):
    queryset = UserRoleAssignment.objects.all()
    serializer_class = UserRoleAssignmentSerializer
    permission_classes = [IsAdminUser]
