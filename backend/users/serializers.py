from rest_framework import serializers
from django.contrib.auth import get_user_model
from roles.models import UserRoleAssignment  # Import the role assignment model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    # Derived fields for displaying role and status
    role_display = serializers.SerializerMethodField()
    status_display = serializers.SerializerMethodField()
    profile_image_url = serializers.SerializerMethodField()
    assigned_role = serializers.SerializerMethodField()  # New field for assigned role details

    class Meta:
        model = User
        fields = [
            'id',
            'email',
            'name',
            'id_code',
            'street',
            'city',
            'state',
            'zip_code',
            'country',
            'profile_image',      # Original field (may be a relative URL)
            'profile_image_url',  # Full URL (derived)
            'role_display',       # Derived display for role ("Admin" vs "Employee")
            'status_display',     # Derived display for status ("Active" vs "Inactive")
            'assigned_role',      # New: Role details from role assignment
        ]

    def get_role_display(self, obj):
        # Returns "Admin" if user is superuser or staff, otherwise "Employee"
        return "Admin" if obj.is_superuser or obj.is_staff else "Employee"

    def get_status_display(self, obj):
        # Returns "Active" if user is active, otherwise "Inactive"
        return "Active" if obj.is_active else "Inactive"

    def get_profile_image_url(self, obj):
        request = self.context.get('request', None)
        if obj.profile_image and request:
            return request.build_absolute_uri(obj.profile_image.url)
        return None

    def get_assigned_role(self, obj):
        # Fetch the most recent role assignment for the user
        assignment = UserRoleAssignment.objects.filter(user=obj).order_by('-assigned_at').first()
        if assignment:
            return {
                "name": assignment.role.name,
                "pay_per_hour": str(assignment.role.pay_per_hour)
            }
        return None
