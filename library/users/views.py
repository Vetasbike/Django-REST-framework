from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializers import UserModelSerialiser
from .models import User


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerialiser

# Create your views here.
