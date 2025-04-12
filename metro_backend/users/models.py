
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    def _create_user(self, email, password=None, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password) # Hashes the password
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    # Remove username field, use email as the unique identifier
    username = None
    email = models.EmailField(_('email address'), unique=True)

    # Add custom fields
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20, unique=True) # Assuming NID is unique
    nid = models.CharField(max_length=20, unique=True) # Assuming NID is unique
    subscription = models.BooleanField(default=False)

    USERNAME_FIELD = 'email' # Use email for login
    REQUIRED_FIELDS = ['name', 'phone_number', 'nid'] # Fields required during createsuperuser

    objects = CustomUserManager() # Use the custom manager

    def __str__(self):
        return self.email
