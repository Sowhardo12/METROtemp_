
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser
from .forms import CustomUserCreationForm, CustomUserChangeForm # We need to create these forms

class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm # Use custom form for adding users in admin
    form = CustomUserChangeForm # Use custom form for changing users in admin
    model = CustomUser
    list_display = ['email', 'name', 'phone_number', 'nid', 'is_staff', 'subscription']
    search_fields = ['email', 'name', 'phone_number', 'nid']
    ordering = ['email']

    # Define fieldsets for admin interface
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name', 'phone_number', 'nid', 'subscription')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'phone_number', 'nid', 'password', 'password2'), # Add password2 here for confirmation
        }),
    )

# Register your models here.
admin.site.register(CustomUser, CustomUserAdmin)