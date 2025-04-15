from rest_framework import serializers
from .models import LeaveRequest

class LeaveRequestSerializer(serializers.ModelSerializer):
    employee_email = serializers.ReadOnlyField(source="employee.email")  # New field for employee email
    shift_date = serializers.DateField(
        format="%Y-%m-%d",
        input_formats=["%Y-%m-%d"],
        required=True,
        error_messages={"invalid": "Date format must be YYYY-MM-DD."}
    )
    shift_time = serializers.ChoiceField(
        choices=LeaveRequest.SHIFT_CHOICES,  
        required=True,
        error_messages={"invalid_choice": "Invalid shift time. Choose from morning, afternoon, or night."}
    )
    location = serializers.CharField(max_length=255, required=True)
    reason = serializers.CharField(required=True)

    class Meta:
        model = LeaveRequest
        fields = ["id", "employee", "employee_email", "shift_date", "shift_time", "location", "reason", "status"]
        read_only_fields = ["id", "employee", "status"]  # Prevent employees from modifying these fields

    def validate(self, data):
        """
        Ensure the employee is not submitting a duplicate leave request for the same shift.
        """
        employee = self.context["request"].user
        shift_date = data.get("shift_date")
        shift_time = data.get("shift_time")

        if LeaveRequest.objects.filter(employee=employee, shift_date=shift_date, shift_time=shift_time).exists():
            raise serializers.ValidationError({"error": "You have already requested leave for this shift."})

        return data

    def create(self, validated_data):
        """Ensure the leave request is always linked to the logged-in employee."""
        validated_data["employee"] = self.context["request"].user
        return super().create(validated_data)
