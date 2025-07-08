from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
# Create your views here.       


class SignInView(APIView):
    permission_classes = [AllowAny] 

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        # validate
        user = User.objects.filter(email=email).first()
        # try:
        if user is None:
            return Response({"err: " : "email does not exist"},status=status.HTTP_400_BAD_REQUEST)
        # user = User.objects.get(email=email )

        if not user.check_password(password):
            return Response({"err: " : "password incorrect"},status=status.HTTP_400_BAD_REQUEST)
        


        
        # return jwt token
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return Response({
            'message': 'Login successful!',
            'access_token': access_token,
            "user": user.username,
        }, status=status.HTTP_200_OK)