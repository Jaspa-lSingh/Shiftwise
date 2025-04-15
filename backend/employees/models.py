from django.db import models

class EmployeeNumber(models.Model):
    employee_number = models.CharField(max_length=50, unique=True)
    is_assigned = models.BooleanField(default=False)  # Set to True once used during signup

    def __str__(self):
        return self.employee_number
