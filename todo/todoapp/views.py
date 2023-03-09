from django.shortcuts import render
from rest_framework.permissions import AllowAny

from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination

from .filters import ProjectFilter, TodoFilter
from .models import Project, Todo
from .serializers import TodoModelSerializer, ProjectModelSerializer, ProjectModelSerializerBase, \
    TodoCustomModelSerializer, ProjectCustomModelSerializerBase


class ProjectModelViewSet(ModelViewSet):
    # permission_classes = [AllowAny]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    filterset_class = ProjectFilter

    def get_serializer_class(self):
        if self.request.method in ['GET'] and self.request.version == 'v2':
            return ProjectCustomModelSerializerBase
        return ProjectModelSerializerBase


class TodoModelViewSet(ModelViewSet):
    # permission_classes = [AllowAny]
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    filterset_class = TodoFilter

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()

    def get_serializer_class(self):
        if self.request.version == 'v2':
            return TodoCustomModelSerializer
        return TodoModelSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20
    