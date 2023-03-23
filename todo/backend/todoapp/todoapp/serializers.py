from rest_framework.serializers import ModelSerializer

from userapp.serializers import UserModelSerializer
from .models import Project, Todo


class ProjectModelSerializer(ModelSerializer):
    users = UserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ProjectModelSerializerBase(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class ProjectCustomModelSerializerBase(ModelSerializer):
    class Meta:
        model = Project
        fields = ('name',)


class TodoModelSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'


class TodoCustomModelSerializer(ModelSerializer):
    users = ProjectModelSerializerBase()

    class Meta:
        model = Todo
        fields = '__all__'
        