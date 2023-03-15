from django.shortcuts import render
from rest_framework import mixins
from rest_framework.generics import ListAPIView
from rest_framework.viewsets import GenericViewSet

from .serializers import UserModelSerializer, UserCustomModelSerializer
from .models import CustomUser


class UserModelViewSet(mixins.RetrieveModelMixin,
                       mixins.UpdateModelMixin,
                       mixins.ListModelMixin,
                       GenericViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserModelSerializer


class UserListAPIView(ListAPIView):
    queryset = CustomUser.objects.all()
    # serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == 'v2':
            return UserCustomModelSerializer
        return UserModelSerializer
    