# users/forms.py
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = CustomUser
        # Ensure email is the primary field, add custom fields
        fields = ('email', 'name', 'phone_number', 'nid')

class CustomUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = CustomUser
        # Ensure email is the primary field, add custom fields
        fields = ('email', 'name', 'phone_number', 'nid', 'subscription') # Add other fields you want editable in admin