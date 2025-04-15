from rest_framework import serializers
from .models import Attendance

class AttendanceSerializer(serializers.ModelSerializer):
    employee_name = serializers.ReadOnlyField(source='employee.name')
    employee_email = serializers.ReadOnlyField(source='employee.email')
    shift_date = serializers.ReadOnlyField(source='shift.date')

    class Meta:
        model = Attendance
        fields = [
            'id',
            'shift',
            'employee',
            'clock_in_time',
            'clock_out_time',
            'clock_in_location',
            'clock_out_location',
            'total_hours',
            'employee_name',
            'employee_email',
            'shift_date',
        ]
        read_only_fields = ['id', 'total_hours']
