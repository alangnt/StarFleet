from django.shortcuts import render, redirect
from Projects.models.ProjectModel import Project
from django import forms


# Define a form for uploading new projects
class ProjectForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = ['title', 'description']


def index(request):
    if request.method == 'POST':
        form = ProjectForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('projects_index')  # We'll name this URL below
    else:
        form = ProjectForm()

    projects = Project.objects.all()
    return render(request, 'projects/index.html', {'projects': projects, 'form': form})
