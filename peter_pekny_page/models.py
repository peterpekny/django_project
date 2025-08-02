from django.db import models

# Create your models here.

# Importuj EditorJsField z modulu django_editorjs2.fields
# from django_editorjs2.fields import EditorJSField   # Importuj EditorJsField z modulu django_editorjs2.models

# Model for EditorJs - removig for the time being
# class Article(models.Model):
#     title = models.CharField(max_length=200)
#     content = EditorJSField()

#     def __str__(self):
#         return self.title
    

# Model for CKEditor 5
from django_ckeditor_5.fields import CKEditor5Field


# class Article(models.Model):
#     VISIBILITY_CHOICES = [
#         ('public', 'Verejný'),
#         ('private', 'Súkromný'),
#     ]

#     title      = models.CharField(max_length=200, verbose_name="Názov článku")
#     content    = CKEditor5Field(config_name="default", verbose_name="Obsah článku")
#     created_at = models.DateTimeField(auto_now_add=True)
    
#     is_deleted = models.BooleanField(default=False, verbose_name="Vymazaný")
#     visibility = models.CharField(
#         max_length=10,
#         choices=VISIBILITY_CHOICES,
#         default='public',
#         verbose_name="Viditeľnosť"
#     )

#     def __str__(self):
#         return f"{self.title} ({'Vymazaný' if self.is_deleted else 'Aktívny'})"

# ==========================================
# New model for articles
# ======== Support function for image saving

import os
import uuid
from datetime import datetime

# Funkcia pre generovanie cesty pre obrázok článku - not working
# ===============================================
def article_image_upload_path(instance, filename):
    """Funkcia, ktorá vygeneruje cestu pre obrázok článku"""
    today = datetime.today()
    upload_dir = f'uploads/{today.year}/{today.month}/'
    
    # Generovanie unikátneho názvu súboru
    ext = filename.split('.')[-1]  # Získanie prípony súboru
    new_filename = f"{uuid.uuid4().hex}.{ext}"  # Unikátne meno súboru
    
    print(f"💾 Upload Directory: {upload_dir}, File: {new_filename}")  # Debugging
    with open("upload_debug.log", "a") as log_file:  # Zápis do logu
        log_file.write(f"Upload Directory: {upload_dir}, File: {new_filename}\n")
    
    return os.path.join(upload_dir, new_filename)

# ===========================
# Database model for articles
# ===========================

#  - Category model
#    vvvvvvvvvvvvvv
class Category(models.Model):
    """Model pre kategórie článkov"""
    name = models.CharField(max_length=100, unique=True, verbose_name="Názov kategórie")

    def __str__(self):
        return self.name

#  - Article model
#    vvvvvvvvvvvvv

class Article(models.Model):
    VISIBILITY_CHOICES = [
        ('public', 'Verejný'),
        ('private', 'Súkromný'),
    ]

    title             = models.CharField(max_length=200, verbose_name="Názov článku")
    short_description = models.CharField(max_length=500, verbose_name="Krátky popis", blank=True, null=True)
    content           = CKEditor5Field(config_name="extends", verbose_name="Obsah článku")
    created_at        = models.DateTimeField(auto_now_add=True)
    image             = models.ImageField(upload_to=article_image_upload_path, verbose_name="Obrázok", blank=True, null=True)
    category          = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Kategória")
    order             = models.IntegerField(default=0)

    is_deleted = models.BooleanField(default=False, verbose_name="Vymazaný")
    visibility = models.CharField(
        max_length=10,
        choices=VISIBILITY_CHOICES,
        default='public',
        verbose_name="Viditeľnosť"
    )
    # for adminsortable2 library 
    class Meta:
        ordering = ['category', 'order']

    def __str__(self):
        return f"{self.title} ({'Vymazaný' if self.is_deleted else 'Aktívny'}) {self.short_description}"






# Model for comments
# vvvvvvvvvvvvvvvvvv
from django.contrib.auth.models import User

class Comment(models.Model):
    article = models.ForeignKey(
        'Article',          # Odkaz na model článku
        on_delete=models.CASCADE,  
        related_name='comments',  # Pre jednoduchší prístup k článkom v šablóne
        verbose_name="Článok"
    )
    author = models.ForeignKey(
        User,                # Prepojenie s modelom používateľa
        on_delete=models.CASCADE,  
        verbose_name="Autor"
    )
    comment = CKEditor5Field(config_name="comment", verbose_name="Komentár")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.author.username} ({self.article.title}) - {self.comment[:50]}"
    

    # Model for game score

    
class Score(models.Model):
    player_name = models.CharField(max_length=100)
    score = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.player_name} – {self.score}"