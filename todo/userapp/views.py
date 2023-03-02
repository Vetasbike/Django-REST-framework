from django.shortcuts import render
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet

from .serializers import UserModelSerializer
from .models import User


class UserModelViewSet(mixins.RetrieveModelMixin,
                       mixins.UpdateModelMixin,
                       mixins.ListModelMixin,
                       GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    