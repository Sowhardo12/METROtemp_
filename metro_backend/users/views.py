
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login, logout
from .serializers import UserRegistrationSerializer, UserLoginSerializer, UserDetailSerializer
from .models import CustomUser

class UserRegistrationView(generics.CreateAPIView):
    """Handles User Registration requests"""
    queryset = CustomUser.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny] # Anyone can register

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        # Optionally create a token upon registration
        token, created = Token.objects.get_or_create(user=user)
        headers = self.get_success_headers(serializer.data)
        # Return minimal info or customize as needed
        return Response(
            {
                "user": UserDetailSerializer(user, context=self.get_serializer_context()).data,
                "token": token.key,
                "message": "Registration successful."
            },
            status=status.HTTP_201_CREATED,
            headers=headers
        )


class UserLoginView(APIView):
    """Handles User Login requests"""
    permission_classes = [permissions.AllowAny] # Anyone can attempt to log in
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data.get('email')
        password = serializer.validated_data.get('password')

        user = authenticate(request, email=email, password=password)

        if user is not None:
            if user.is_active:
                # Generate or retrieve token
                token, created = Token.objects.get_or_create(user=user)
                # login(request, user) # Optional: If using Django sessions alongside tokens

                return Response({
                    "user": UserDetailSerializer(user).data,
                    "token": token.key,
                    "message": "Login successful."
                }, status=status.HTTP_200_OK)
            else:
                return Response({"error": "This account is inactive."}, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({"error": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class UserLogoutView(APIView):

    permission_classes = [permissions.IsAuthenticated] # Only authenticated users can log out

    def post(self, request, *args, **kwargs):
        try:
            # Delete the token associated with the user
            request.user.auth_token.delete()
            # logout(request) # Optional: if using Django sessions
            return Response({"message": "Successfully logged out."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserDetailView(generics.RetrieveAPIView):
    """Retrieves details of the currently logged-in user"""
    serializer_class = UserDetailSerializer
    permission_classes = [permissions.IsAuthenticated] # Must be logged in to view details

    def get_object(self):
        
        return self.request.user