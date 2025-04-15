from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RoleViewSet, UserRoleAssignmentViewSet

router = DefaultRouter()
router.register('roles', RoleViewSet)
router.register('assign-role', UserRoleAssignmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
