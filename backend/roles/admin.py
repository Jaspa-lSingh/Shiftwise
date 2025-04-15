from django.contrib import admin
from .models import Role, UserRoleAssignment

admin.site.register(Role)
admin.site.register(UserRoleAssignment)
