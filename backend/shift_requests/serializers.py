# shift_requests/serializers.py
from rest_framework import serializers
from .models import ShiftSwapRequest, CoverUpShift

class ShiftSwapRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShiftSwapRequest
        fields = '__all__'
        read_only_fields = ['id', 'requester', 'status', 'created_at']
# shift_requests/serializers.py (add)
class CoverUpShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoverUpShift
        fields = '__all__'
        read_only_fields = ['id', 'posted_by', 'status', 'claimed_by', 'created_at']
