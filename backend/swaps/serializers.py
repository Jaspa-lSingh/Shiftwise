from rest_framework import serializers
from .models import SwapShiftRequest
from authentication.models import User  # <-- Adjust this based on your app name

class SwapShiftRequestSerializer(serializers.ModelSerializer):
    requested_by_email = serializers.EmailField(source='requested_by.email', read_only=True)
    give_up_shift_detail = serializers.StringRelatedField(source='give_up_shift', read_only=True)
    desired_shift_detail = serializers.StringRelatedField(source='desired_shift', read_only=True)

    # Extra fields for the employee assigned to the desired shift
    desired_shift_assigned_to_name = serializers.SerializerMethodField()
    desired_shift_assigned_to_id_code = serializers.SerializerMethodField()

    class Meta:
        model = SwapShiftRequest
        fields = [
            'id', 'requested_by', 'requested_by_email',
            'give_up_shift', 'give_up_shift_detail',
            'desired_shift', 'desired_shift_detail',
            'desired_shift_assigned_to_name',
            'desired_shift_assigned_to_id_code',
            'status', 'created_at',
        ]
        read_only_fields = ['requested_by', 'status', 'created_at']

    def get_desired_shift_assigned_to_name(self, obj):
        user = getattr(obj.desired_shift, "employee", None)
        return getattr(user, "name", None) if user else None

    def get_desired_shift_assigned_to_id_code(self, obj):
        user = getattr(obj.desired_shift, "employee", None)
        return getattr(user, "id_code", None) if user else None
