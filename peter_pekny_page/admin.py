from django.contrib import admin

# Register your models here.


from .models import Article

admin.site.register(Article)  # Registrácia modelu Article v admin paneli
