# payroll/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import EmployeeProfile, PayrollRun, PayrollDetail
from .serializers import EmployeeProfileSerializer, PayrollRunSerializer
from .utils import calculate_salary
import requests  # If you need to call the attendance API

class EmployeeListView(APIView):
    def get(self, request):
        employees = EmployeeProfile.objects.all()
        serializer = EmployeeProfileSerializer(employees, many=True)
        return Response(serializer.data)

class ProcessPayrollView(APIView):
    def post(self, request):
        # Get the payroll period dates from the request or define them
        start_date = request.data.get("start_date")
        end_date = request.data.get("end_date")

        # Create a new PayrollRun record
        payroll_run = PayrollRun.objects.create(start_date=start_date, end_date=end_date)

        # Get all employees
        employees = EmployeeProfile.objects.all()

        # For each employee, fetch attendance data (example API call) and calculate salary
        for emp in employees:
            # Example: fetch attendance hours for this employee (you may need to authenticate and supply parameters)
            # attendance_response = requests.get(f"http://127.0.0.1:8000/api/attendance/{emp.user.id}/?start_date={start_date}&end_date={end_date}")
            # For demonstration, let's assume worked_hours is returned as a number
            # worked_hours = attendance_response.json().get("worked_hours", 0)
            worked_hours = 42  # For demo purposes, assume every employee worked 42 hours

            calc = calculate_salary(emp, worked_hours)

            PayrollDetail.objects.create(
                payroll_run=payroll_run,
                employee=emp,
                worked_hours=worked_hours,
                base_salary=calc["base_salary"],
                overtime_pay=calc["overtime_pay"],
                deductions=calc["deductions"],
                net_salary=calc["net_salary"]
            )

        serializer = PayrollRunSerializer(payroll_run)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
