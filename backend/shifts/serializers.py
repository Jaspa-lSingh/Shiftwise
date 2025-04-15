# shifts/serializers.py
from rest_framework import serializers
from .models import Shift

class ShiftSerializer(serializers.ModelSerializer):
    employee_email = serializers.ReadOnlyField(source='employee.email')
    employee_name = serializers.ReadOnlyField(source='employee.name')
    employee_id_code = serializers.ReadOnlyField(source='employee.id_code')

    class Meta:
        model = Shift
        fields = [
            'id',
            'date',
            'start_time',
            'end_time',
            'employee',
            'employee_email',
            'employee_name',
            'employee_id_code',
            'location',
            'status',
        ]
