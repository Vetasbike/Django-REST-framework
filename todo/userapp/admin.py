from django.contrib import admin

from todoapp.models import Project, Todo
from userapp.models import User

# Register your models here.
admin.site.register(User)
admin.site.register(Project)
admin.site.register(Todo)
