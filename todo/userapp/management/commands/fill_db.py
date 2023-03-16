from django.contrib.auth.models import Group

from userapp.models import CustomUser
from django.core.management.base import BaseCommand


class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        CustomUser.objects.all().delete()

        CustomUser.objects.create_superuser(username='Администратор 1', first_name='Администратор', last_name='',
                                     email='kovbozh@gmail.com', password='123')
        CustomUser.objects.create_user(username='Владелец проектов 1', is_staff=True, first_name='Владелец проектов', last_name='',
                                 email='kovbozh1@gmail.com', password='123')
        CustomUser.objects.create_user(username='Владелец проектов 2', is_staff=True, first_name='Владелец проектов', last_name='',
                                 email='kovbozh2@gmail.com', password='123')
        CustomUser.objects.create_user(username='Разработчик 1', is_staff=True, first_name='Разработчик', last_name='',
                                 email='kovbozh3@gmail.com', password='123')
        CustomUser.objects.create_user(username='Разработчик 2', is_staff=True, first_name='Разработчик', last_name='',
                                 email='kovbozh4@gmail.com', password='123')
        CustomUser.objects.create_superuser(username='dr0n', first_name='Андрей', last_name='Божков',
                                      email='dr0nx@yandex.ru', password='123')

        Group.objects.all().delete()
        names = ['Администраторы', 'Владельцы проектов', 'Разработчики']
        group = dict()
        for i, name in enumerate(names):
            group['id'] = i
            group['name'] = name
            new_group = Group(**group)
            new_group.save()
            