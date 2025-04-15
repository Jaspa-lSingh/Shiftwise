# payroll/serializers.py
from rest_framework import serializers
from .models import Department, EmployeeProfile, PayrollRun, PayrollDetail

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name', 'description']

class EmployeeProfileSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)
    class Meta:
        model = EmployeeProfile
        fields = ['id', 'user', 'department', 'base_salary']

class PayrollDetailSerializer(serializers.ModelSerializer):
    employee = EmployeeProfileSerializer(read_only=True)
    class Meta:
        model = PayrollDetail
        fields = '__all__'

class PayrollRunSerializer(serializers.ModelSerializer):
    details = PayrollDetailSerializer(many=True, read_only=True)
    class Meta:
        model = PayrollRun
        fields = '__all__'
