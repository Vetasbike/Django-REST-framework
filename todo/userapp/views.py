from django.shortcuts import render
from rest_framework import mixins
from rest_framework.generics import ListAPIView
from rest_framework.viewsets import GenericViewSet

from .serializers import UserModelSerializer, UserCustomModelSerializer
from .models import User


class UserModelViewSet(mixins.RetrieveModelMixin,
                       mixins.UpdateModelMixin,
                       mixins.ListModelMixin,
                       GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer


class UserListAPIView(ListAPIView):
    queryset = User.objects.all()
    # serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == 'v2':
            return UserCustomModelSerializer
        return UserModelSerializer
    