from django.test import TestCase

# Create your tests here.

from django.test import TestCase
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APIRequestFactory, APIClient, APITestCase, force_authenticate, CoreAPIClient
from rest_framework.authtoken.models import Token
from mixer.backend.django import mixer
from django.contrib.auth import get_user_model
from .views import ProjectModelViewSet
from .models import Project, Todo


class TestProjectViewSet(TestCase):

    def setUp(self):
        self.factory = APIRequestFactory()
        self.client = APIClient()

        self.uri = '/api-token/'

        self.admin = get_user_model().objects.create_superuser(username='Администратор 1',
                                                               email='kovbozh@gmail.com',
                                                               password='123')
        self.user = get_user_model().objects.create_user(username='Владелец проектов 2',
                                                         email='kovbozh2@gmail.com',
                                                         password='123')
        self.token = Token.objects.create(user=self.user)
        self.token.save()

    def test_get_factory_guest_fail(self):
        request = self.factory.get(self.uri)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_factory_fail(self):
        request = self.factory.get(self.uri)
        force_authenticate(request, self.user)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertNotEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_factory_success(self):
        request = self.factory.get(self.uri, HTTP_AUTHORIZATION='Token {}'.format(self.token.key))
        force_authenticate(request, self.user)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_factory_success(self):
        self.uri = reverse('token')
        view = ProjectModelViewSet.as_view({'post': 'create'})
        request = self.factory.post(self.uri,
                                    {
                                        'name': 'Проект 1',
                                        'users': [1]
                                    },
                                    HTTP_AUTHORIZATION='Token {}'.format(self.token.key),
                                    format='json')
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_client_fail(self):
        project = Project.objects.create(name='Проект 1')
        response = self.client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_client_success(self):
        project = Project.objects.create(name='Проект 1')
        self.client.login(username=self.admin, password=self.user.password)
        response = self.client.put(f'/api/projects/{project.id}/',
                                   {
                                       'name': 'Проект 1',
                                       'users': [1]
                                   },
                                   HTTP_AUTHORIZATION='Token {}'.format(self.token.key),
                                   format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.name, 'Проект 1')
        self.client.logout()


class TestTodoViewSet(APITestCase):
    def setUp(self):
        self.admin = get_user_model().objects.create_superuser(username='Администратор 2',
                                                               email='kovbozh@gmail.com',
                                                               password='123')
        self.user = get_user_model().objects.create_user(username='Владелец проектов 2',
                                                         email='kovbozh2@gmail.com',
                                                         password='123')
        self.project = Project.objects.create(name='Проект 1')
        self.project_data = {'name': 'Проект 1', 'link': 'http://127.0.0.1:8000/api/projects/'
        }
        self.todo = Todo.objects.create(text='Текст заметки 1', project=self.project, user=self.user)
        self.todo_data = {'user': 1, 'text': 'Текст заметки 1', 'project': 1, 'isActive': 0}

        self.token = Token.objects.create(user=self.user)
        self.token.save()

    def test_get_testcase_guest_fail(self):
        response = self.client.get('/api/todos/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_testcase_admin_success(self):
        self.client.login(username=self.admin, password=self.user.password)
        response = self.client.put(f'/api/todos/{self.todo.id}/', self.todo_data,
                                   HTTP_AUTHORIZATION='Token {}'.format(self.token.key),
                                   format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=self.project.id)
        self.assertEqual(project.name, 'Проект 1')
        self.client.logout()

    def test_edit_testcase_mixer(self):
        self.todo = mixer.blend(Todo)
        self.client.login(username=self.admin, password=self.user.password)
        response = self.client.patch(f'/api/todos/{self.todo.id}/', self.todo_data,
                                     HTTP_AUTHORIZATION='Token {}'.format(self.token.key),
                                     format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=self.project.id)
        self.assertEqual(project.name, 'Проект 1')
        self.client.logout()
        