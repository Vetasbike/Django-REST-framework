from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from .serializers import UserModelSerializer
from .models import User


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer