# payroll/utils.py
def calculate_salary(employee_profile, worked_hours):
    """
    Calculate salary based on base_salary and worked hours.
    Adjust with overtime if worked_hours > standard (e.g., 40 hours).
    """
    # Let's assume base_salary is the pay for 40 hours a week.
    standard_hours = 40
    base_salary = employee_profile.base_salary

    if worked_hours <= standard_hours:
        net_salary = base_salary * (worked_hours / standard_hours)
        overtime_pay = 0
    else:
        # Overtime rate: 1.5x base rate
        overtime_hours = worked_hours - standard_hours
        overtime_rate = (base_salary / standard_hours) * 1.5
        overtime_pay = overtime_hours * overtime_rate
        net_salary = base_salary + overtime_pay

    # For now, assume no deductions
    deductions = 0

    return {
        'base_salary': base_salary,
        'overtime_pay': overtime_pay,
        'deductions': deductions,
        'net_salary': net_salary,
    }
