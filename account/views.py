from rest_framework import viewsets
from django.contrib.auth import get_user_model
from . import serializers


class UserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all().order_by('-date_joined')
    serializer_class = serializers.UserSerializer
