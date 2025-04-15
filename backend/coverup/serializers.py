from rest_framework import serializers
from .models import CoverUpShift

class CoverUpShiftSerializer(serializers.ModelSerializer):
    shift_details = serializers.StringRelatedField(source='shift', read_only=True)
    posted_by_email = serializers.EmailField(source='posted_by.email', read_only=True)
    claimed_by_email = serializers.EmailField(source='claimed_by.email', read_only=True)

    class Meta:
        model = CoverUpShift
        fields = [
            'id',
            'shift',
            'shift_details',
            'posted_by',
            'posted_by_email',
            'claimed_by',
            'claimed_by_email',
            'status',
            'created_at'
        ]
        read_only_fields = ['posted_by', 'status', 'claimed_by', 'created_at']
