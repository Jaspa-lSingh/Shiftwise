from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate

User = get_user_model()

# ------------------------------
# User Serializer
# ------------------------------
class UserSerializer(serializers.ModelSerializer):
    # Derived fields for display
    role_display = serializers.SerializerMethodField()
    status_display = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id',
            'email',
            'id_code',
            'name',
            'street',
            'city',
            'state',
            'zip_code',
            'country',
            'profile_image',
            # Derived fields:
            'role_display',
            'status_display',
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def get_role_display(self, obj):
        # If the user is a superuser or staff, display "Admin", otherwise "Employee"
        if obj.is_superuser or obj.is_staff:
            return "Admin"
        return "Employee"

    def get_status_display(self, obj):
        # If the user is active, display "Active", otherwise "Inactive"
        return "Active" if obj.is_active else "Inactive"

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            id_code=validated_data['id_code'],
            name=validated_data.get('name', ''),
            street=validated_data.get('street', ''),
            city=validated_data.get('city', ''),
            state=validated_data.get('state', ''),
            zip_code=validated_data.get('zip_code', ''),
            country=validated_data.get('country', ''),
            profile_image=validated_data.get('profile_image', None),
            password=validated_data['password']
        )
        return user

# ------------------------------
# Login Serializer (Updated)
# ------------------------------
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    id_code = serializers.CharField(write_only=True)

    def validate(self, data):
        # Attempt to authenticate with email and password
        user = authenticate(email=data['email'], password=data['password'])
        if not user:
            raise serializers.ValidationError("Invalid login credentials")
        # Validate the provided id_code against the user's id_code
        if user.id_code != data.get('id_code'):
            raise serializers.ValidationError("Invalid ID code for this user")
        # Return the user wrapped in a dictionary for clarity
        return {"user": user}

# ------------------------------
# Register Serializer
# ------------------------------
class RegisterSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = [
            'name',
            'email',
            'password',
            'id_code',
            'street',
            'city',
            'state',
            'zip_code',
            'country',
            'profile_image'
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_image = validated_data.pop('profile_image', None)
        user = User.objects.create_user(**validated_data)
        if profile_image:
            user.profile_image = profile_image
            user.save()
        return user
