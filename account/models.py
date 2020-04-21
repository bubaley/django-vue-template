
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, first_name=None, last_name=None,
                    is_superuser=False, is_staff=False):
        if not username:
            raise ValueError('Users must have a username')
        if not email:
            raise ValueError("Users must have an email address")
        if not password:
            raise ValueError("Users must have a password))")
        user = self.model(
            username=username,
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name
        )
        user.set_password(password)  # change user password
        user.is_active = True
        user.is_staff = is_staff
        user.is_superuser = is_superuser
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None):
        user = self.create_user(
                username,
                email,
                password=password,
                is_staff=True,
                is_superuser=True
        )
        return user


class User(AbstractUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=255, null=True)
    last_name = models.CharField(max_length=255, null=True)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']
