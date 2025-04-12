# metro_backend/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')), # Prefix user URLs with 'api/users/'
    # Add other app URLs here later
]