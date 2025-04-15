# users/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # Adjust these fields according to your user model. For example, if you have a custom field "role" or "status", include them.
        fields = ['id', 'name', 'email', 'is_staff', 'is_active']
