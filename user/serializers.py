from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'username', 'first_name', 'last_name', 'phone', 'email', 'is_superuser', 'is_staff', 'is_active')
