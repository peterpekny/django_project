from django.contrib import admin
from peter_pekny_page.models import Article, Category, Comment
from adminsortable2.admin import SortableAdminMixin, SortableInlineAdminMixin, SortableAdminBase
from adminsortable2.admin import SortableTabularInline


# Inline radenie článkov v rámci jednej kategórie
class ArticleInline(SortableTabularInline):  # ← TOTO JE TO DÔLEŽITÉ
    model = Article
    fields = ('title', 'order', 'visibility', 'is_deleted')
    extra = 0
    sortable = 'order'


# Admin pre kategórie – zobrazí zoznam a umožní triediť články inline
@admin.register(Category)
class CategoryAdmin(SortableAdminBase, admin.ModelAdmin):
    inlines = [ArticleInline]
    list_display = ('name',)
    search_fields = ('name',)


# Admin pre články – zobrazenie zoznamu s možnosťou úprav (ale bez drag & drop)
@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):  # bez SortableAdminMixin
    list_display = ('title', 'category', 'visibility', 'created_at', 'is_deleted')
    fields = ('title', 'category', 'visibility', 'created_at', 'is_deleted')
    list_filter = ('visibility', 'is_deleted')
    search_fields = ('title', 'short_description', 'content')
    ordering = ('category', 'order')  # zachováme triedenie
    list_editable = ('visibility', 'is_deleted')
    prepopulated_fields = {"title": ("short_description",)}


# Admin pre komentáre (voliteľné – ak ho ešte nemáš)
@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('article', 'author', 'created_at')
    search_fields = ('article__title', 'author__username', 'content')
    list_filter = ('created_at',)