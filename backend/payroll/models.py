# payroll/models.py
from django.db import models
from django.conf import settings  # Assuming you use the custom User model

class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class EmployeeProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True)
    # Store base salary per week, or an hourly rate, depending on your logic
    base_salary = models.DecimalField(max_digits=10, decimal_places=2, help_text="Weekly salary")
    # If you want hourly rate instead:
    # hourly_rate = models.DecimalField(max_digits=7, decimal_places=2)

    def __str__(self):
        return f"{self.user.name} ({self.department})"

class PayrollRun(models.Model):
    start_date = models.DateField(help_text="Start of the payroll period")
    end_date = models.DateField(help_text="End of the payroll period")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payroll from {self.start_date} to {self.end_date}"

class PayrollDetail(models.Model):
    payroll_run = models.ForeignKey(PayrollRun, on_delete=models.CASCADE, related_name="details")
    employee = models.ForeignKey(EmployeeProfile, on_delete=models.CASCADE)
    worked_hours = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    base_salary = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    overtime_pay = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    deductions = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    net_salary = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f"Payroll Detail for {self.employee.user.name}"
