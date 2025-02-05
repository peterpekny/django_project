from django.db import models

# Create your models here.

# Importuj EditorJsField z modulu django_editorjs2.fields
from django_editorjs2.fields import EditorJSField   # Importuj EditorJsField z modulu django_editorjs2.models

# Model for EditorJs - removig for the time being
# class Article(models.Model):
#     title = models.CharField(max_length=200)
#     content = EditorJSField()

#     def __str__(self):
#         return self.title
    

# Model for CKEditor 5
from django_ckeditor_5.fields import CKEditor5Field


from django.db import models
from django_ckeditor_5.fields import CKEditor5Field

class Article(models.Model):
    VISIBILITY_CHOICES = [
        ('public', 'Verejný'),
        ('private', 'Súkromný'),
    ]

    title = models.CharField(max_length=200, verbose_name="Názov článku")
    content = CKEditor5Field(config_name="default", verbose_name="Obsah článku")
    created_at = models.DateTimeField(auto_now_add=True)
    
    is_deleted = models.BooleanField(default=False, verbose_name="Vymazaný")
    visibility = models.CharField(
        max_length=10,
        choices=VISIBILITY_CHOICES,
        default='public',
        verbose_name="Viditeľnosť"
    )

    def __str__(self):
        return f"{self.title} ({'Vymazaný' if self.is_deleted else 'Aktívny'})"




# Model for comments

class Comment(models.Model):
    author = models.CharField(max_length=100, verbose_name="Autor")
    text = CKEditor5Field(config_name="comment", verbose_name="Komentár")  # Použitie CKEditor5
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.author}: {self.text[:50]}"  # Skrátený náhľad komentára