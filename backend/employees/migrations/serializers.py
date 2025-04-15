from rest_framework import serializers
from django.contrib.auth import get_user_model
from employees.models import EmployeeNumber  # Ensure the path is correct

User = get_user_model()

class SignupSerializer(serializers.ModelSerializer):
    # The employee ID provided by HR. Write-only because you don't want it returned to the client.
    id_code = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            'name',
            'email',
            'password',
            'id_code',      # Employee ID field
            'street',
            'city',
            'state',
            'zip_code',
            'country',
            'profile_image',
        ]
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate_id_code(self, value):
        # Check that the employee number exists and is not yet assigned.
        try:
            emp = EmployeeNumber.objects.get(employee_number=value)
        except EmployeeNumber.DoesNotExist:
            raise serializers.ValidationError("Invalid employee number. Please contact HR.")
        if emp.is_assigned:
            raise serializers.ValidationError("This employee number has already been used.")
        return value

    def create(self, validated_data):
        # Remove id_code from the data to pass to the user creation method.
        id_code = validated_data.pop('id_code')
        # Create the user (make sure your User model's create_user method handles password hashing, etc.)
        user = User.objects.create_user(**validated_data)
        # Mark the employee number as assigned
        emp = EmployeeNumber.objects.get(employee_number=id_code)
        emp.is_assigned = True
        emp.save()
        return user
