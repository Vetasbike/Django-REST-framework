from django.db import models

from todo import settings
from userapp.models import User


# Create your models here.

class Project(models.Model):
    name = models.TextField(verbose_name='Имя проекта', max_length=64, blank=False)
    link = models.URLField(verbose_name='Ссылка на репозиторий', max_length=64, blank=False, null=True)
    users = models.ManyToManyField(settings.AUTH_USER_MODEL, verbose_name='Пользователи проекта')

    class Meta:
        verbose_name = 'Проект'
        verbose_name_plural = verbose_name

    def __str__(self):
        return f'{self.name}'


class Todo(models.Model):
    project = models.ForeignKey(Project, verbose_name='Проект', on_delete=models.CASCADE)
    text = models.TextField(verbose_name='Текст заметки', max_length=1024, blank=False)
    created_at = models.DateTimeField(verbose_name='Создано', editable=False, auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name='Обновлено', auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='Автор заметки', on_delete=models.CASCADE)
    is_active = models.BooleanField(verbose_name='Активно', default=True)

    class Meta:
        verbose_name = 'Заметка'
        verbose_name_plural = verbose_name

    def __str__(self):
        return f'{self.text}'
