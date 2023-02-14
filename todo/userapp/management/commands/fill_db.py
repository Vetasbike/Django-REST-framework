import random
import string

from userapp.models import User
from django.core.management.base import BaseCommand


class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        User.objects.all().delete()

        for i in range(3):
            username = f'user{i + 1}'
            email = ''.join(random.choice(string.ascii_letters.lower()) for _ in range(5)) + '@gmail.com'
            User.objects.create_user(username=username, email=email, password='321')

        User.objects.create_superuser(username='dr0n', first_name='Андрей', last_name='Божков',
                                      email='kovbozh@gmail.com', password='321')