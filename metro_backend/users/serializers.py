
from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions as django_exceptions

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True, label="Confirm password")

    class Meta:
        model = CustomUser
        fields = ('email', 'name', 'phone_number', 'nid', 'password', 'password2')
        extra_kwargs = {
            'name': {'required': True},
            'phone_number': {'required': True},
            'nid': {'required': True},
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        # You can add more validation for NID, phone number format etc. here
        return attrs

    def create(self, validated_data):
        # Create user using the custom manager's create_user method
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            phone_number=validated_data['phone_number'],
            nid=validated_data['nid'],
            password=validated_data['password'] # create_user handles hashing
        )
       
        return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(label="Email", write_only=True)
    password = serializers.CharField(
        label="Password",
        style={'input_type': 'password'},
        trim_whitespace=False,
        write_only=True
    )

    def validate(self, attrs):
        # Authentication logic will be in the view, this just validates fields exist
        email = attrs.get('email')
        password = attrs.get('password')

        if not email or not password:
            raise serializers.ValidationError("Must include 'email' and 'password'.", code='authorization')

        # Note: Actual user authentication happens in the view
        attrs['user'] = None # Placeholder, will be set in the view if auth succeeds
        return attrs

class UserDetailSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'name', 'phone_number', 'nid', 'subscription', 'last_login', 'date_joined')
        read_only_fields = fields # Make all fields read-only for display