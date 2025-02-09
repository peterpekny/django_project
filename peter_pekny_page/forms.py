from django import forms


# ========================================
# Formulár pre pridávanie a úpravu článkov
# ========================================

# Nacitanie kniznic pouzitych pre formular
from django_ckeditor_5.widgets import CKEditor5Widget
from peter_pekny_page.models import Article
from peter_pekny_page.models import Category

class ArticleForm(forms.ModelForm):
    """Formulár pre pridávanie a úpravu článkov."""
    # Definujeme category tu, kvoli rozsirenym moznostial objektu
    category = forms.ModelChoiceField(
        queryset=Category.objects.all(),  # Načítame dostupné kategórie
        required=True,  # Pole je povinné
        empty_label="Vyberte kategóriu",  # Používateľ musí niečo vybrať
        widget=forms.Select(attrs={'class': 'custom-select'})  # Štýlovanie selectu
    )

    class Meta:
        model = Article
        
        fields = ['title', 'short_description', 'content', 'visibility' , 'category']
        widgets = {
            'short_description': forms.Textarea(attrs={
                'class': 'styled-input',
                'rows': 3,
                'placeholder': 'Zadajte krátky popis článku...',
            }),
            'content': CKEditor5Widget(config_name='extends'),
            'visibility': forms.Select(choices=Article.VISIBILITY_CHOICES, attrs={'class': 'custom-select'}),
            # 'category': forms.Select(attrs={'class': 'custom-select'}), # Nepotrebujeme, pretože je definované vyššie - obmedzene moznosti widgetu - prebera info len s Modelu
        }

# ========================================
# Formulár pre pridávanie komentárov
# ========================================

# Nacitanie kniznic pouzitych pre formularov
from .models import Comment

class CommentForm(forms.ModelForm):
      """Form for comments to the article."""

      def __init__(self, *args, **kwargs):
          super().__init__(*args, **kwargs)
          self.fields["text"].required = False

      class Meta:
          model = Comment
          fields = ("author", "text")
          widgets = {
              "text": CKEditor5Widget(
                  attrs={"class": "django_ckeditor_5"}, config_name="comment"
              )
          }