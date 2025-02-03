from django.db import models

# Create your models here.

# Importuj EditorJsField z modulu django_editorjs2.fields
from django_editorjs2.fields import EditorJSField   # Importuj EditorJsField z modulu django_editorjs2.models

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = EditorJSField()

    def __str__(self):
        return self.title