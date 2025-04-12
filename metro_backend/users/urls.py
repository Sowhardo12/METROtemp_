
from django.urls import path
from .views import UserRegistrationView, UserLoginView, UserLogoutView, UserDetailView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
    path('me/', UserDetailView.as_view(), name='user-detail'), # Endpoint to get current user details
]