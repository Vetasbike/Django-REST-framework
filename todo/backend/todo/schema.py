from django.db.models import Q
from graphene import Schema, ObjectType, String, List, Field, ID, Boolean, Mutation
from graphene_django import DjangoObjectType

from todoapp.models import Project, Todo
from userapp.models import User


class UserObjectType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ProjectObjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TodoObjectType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class Query(ObjectType):
    users = List(UserObjectType)
    projects = List(ProjectObjectType)
    todos = List(TodoObjectType)
    users_by_name = List(UserObjectType, name=String(default_value=''))
    user_by_id = Field(UserObjectType, id=ID(required=True))
    projects_by_name = List(ProjectObjectType, name=String(default_value=''))

    def resolve_users_by_name(self, info, name):
        return User.objects.filter(first_name__contains=name)

    def resolve_projects(self, info):
        return Project.objects.all()

    def resolve_todos(self, info):
        return Todo.objects.all()

    def resolve_projects_by_name(self, info, name):
        return Project.objects.filter(name__contains=name)

    def resolve_users(self, info):
        return User.objects.all()

    def resolve_user_by_id(self, info, id):
        return User.objects.get(id=id)


class TodoMutation(Mutation):
    class Arguments:
        id = ID()
        is_active = Boolean(required=True)

    todo = Field(TodoObjectType)

    @classmethod
    def mutate(cls, root, info, **kwargs):
        todo = Todo.objects.get(id=kwargs.get('id'))
        todo.is_active = kwargs.get('is_active')
        todo.save()
        return cls(todo=todo)


class Mutation(ObjectType):
    update_todo = TodoMutation.Field()


schema = Schema(query=Query, mutation=Mutation)

# поиск по названию проекта

# {
#   projectsByName(name: "Проект 1") {
#     name
#   }
# }

# поиск по имени пользователя

# {
#   usersByName(name: "Владелец проектов") {
#     username
#     firstName
#     lastName
#   }
# }

# запрос на получение всех todo с проектом и его пользователями

# {
#   todos {
#     id
#     text
#     user {
#       id
#       firstName
#       lastName
#     }
#     project {
#       id
#       name
#       users {
#         id
#         username
#       }
#     }
#   }
# }

# запрос на изменение is_active для todo

# mutation updateTodo {
#   updateTodo(id: 1, isActive: true) {
#     todo {
#       id
# 		isActive
#     }
#   }
# }
