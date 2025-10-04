from django.contrib import admin

from Projects.admins.ProjectAdmin import ProjectAdmin
from Projects.models.ProjectModel import Project


admin.site.register(Project, ProjectAdmin)
