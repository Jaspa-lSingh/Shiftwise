from rest_framework import serializers
from .models import Inquiry

class InquirySerializer(serializers.ModelSerializer):
    employee_name = serializers.ReadOnlyField(source='employee.get_full_name')
    employee_email = serializers.ReadOnlyField(source='employee.email')

    class Meta:
        model = Inquiry
        fields = [
            'id',
            'employee',
            'employee_name',
            'employee_email',
            'subject',
            'message',
            'answer',  # Admin reply
            'status',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'employee', 'employee_name', 'employee_email', 'created_at', 'updated_at', 'status']

    def update(self, instance, validated_data):
        """
        Automatically update status to 'answered' when an answer is provided.
        """
        if 'answer' in validated_data and validated_data['answer']:
            instance.status = 'answered'
        return super().update(instance, validated_data)
