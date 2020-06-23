from django.contrib.auth import get_user_model
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from user.serializers import UserSimpleSerializer, UserSerializer, UserCreateSerializer

User = get_user_model()


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_classes = {
        'list': UserSimpleSerializer,
        'create': UserCreateSerializer,
        'update': UserCreateSerializer
    }

    # uncomment if you want use permissions
    # def get_permissions(self):
    #     if self.action in ('create', 'update', 'destroy', 'list', 'retrieve'):
    #         permission_classes = [IsAdminUser]
    #     else:
    #         permission_classes = [IsAuthenticated]
    #     return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        return self.serializer_classes.get(self.action, UserSerializer)

    def perform_create(self, serializer):
        serializer.save()

    def perform_update(self, serializer):
        instance = serializer.save()
        if self.request.data.get('password'):
            instance.set_password(self.request.data.get('password'))
            instance.save()

    @action(methods=['GET'], detail=False)
    def me(self, request):
        return Response(UserSerializer(self.request.user).data)
