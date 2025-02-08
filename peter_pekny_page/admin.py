from django.contrib import admin
from peter_pekny_page.models import Article


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'visibility', 'created_at', 'is_deleted')  # Stĺpce v admin paneli
    list_filter = ('visibility', 'is_deleted')  # Možnosť filtrovať články
    search_fields = ('title', 'short_description', 'content')  # Možnosť vyhľadávať
    ordering = ('-created_at',)  # Najnovšie články budú hore
    list_editable = ('visibility', 'is_deleted')  # Priama editácia týchto polí v zozname článkov
    prepopulated_fields = {"title": ("short_description",)}  # Automatické generovanie názvu (voliteľné)


# admin.site.register(Article, ArticleAdmin)
