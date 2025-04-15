from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Announcement

User = get_user_model()

class AnnouncementSerializer(serializers.ModelSerializer):
    # Writeable field: expects an array of user IDs for recipients
    recipients = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        many=True,
        required=False
    )
    # Read-only field: returns the recipients' emails for display purposes
    recipients_emails = serializers.SerializerMethodField()

    class Meta:
        model = Announcement
        fields = [
            "id",
            "topic",
            "message",
            "created_at",
            "recipients",
            "recipients_emails",
        ]
        read_only_fields = ["id", "created_at"]

    def get_recipients_emails(self, obj):
        # Return a list of email addresses for all recipient users
        return [user.email for user in obj.recipients.all()]

    def create(self, validated_data):
        # Remove recipients data from validated_data (if provided)
        recipients_data = validated_data.pop("recipients", [])
        # Create the announcement instance with the remaining data
        announcement = Announcement.objects.create(**validated_data)
        # Set the ManyToMany relationship for recipients
        announcement.recipients.set(recipients_data)
        return announcement
