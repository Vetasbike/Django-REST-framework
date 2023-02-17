from django.shortcuts import render

from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination

from .filters import ProjectFilter, TodoFilter
from .models import Project, Todo
from .serializers import TodoModelSerializer, ProjectModelSerializer


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    filterset_class = ProjectFilter


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    filterset_class = TodoFilter

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20
    