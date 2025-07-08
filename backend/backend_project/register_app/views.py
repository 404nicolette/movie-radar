from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from .register_serialiser import RegisterSerialiser

# Create your views here.

class RegisterUserView(APIView):
    permission_classes = [AllowAny] 

    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")
        first_name = request.data.get("first_name")
        last_name = request.data.get("last_name")

        # validate the bio id and email (pk)
        if User.objects.filter(email=email).exists():
            return Response({"message" : "Email already exist!"}, status=status.HTTP_400_BAD_REQUEST)

        # create the petitioner record
        create_user = User.objects.create_user(
            username = username,
            email=email,
            password = password,
            first_name = first_name,
            last_name = last_name
        )
        create_user.save()

        register_serialiser = RegisterSerialiser(create_user)


        # # jwt token created after registration
        # refresh = RefreshToken.for_user(create_user)
        # access_token = str(refresh.access_token)

        #for the serialiser
        return Response({
            'message': 'Registration successful!',
            'user': register_serialiser.data,
        }, status=status.HTTP_201_CREATED) 
       