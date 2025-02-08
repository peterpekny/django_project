from django import forms
from django_ckeditor_5.widgets import CKEditor5Widget




from .models import Article

class ArticleForm(forms.ModelForm):
    """Formulár pre pridávanie a úpravu článkov."""

    class Meta:
        model = Article
        # fields = ['title', 'short_description', 'content', 'image', 'visibility']
        fields = ['title', 'short_description', 'content', 'visibility']
        widgets = {
            'short_description': forms.Textarea(attrs={
                'class': 'styled-input',
                'rows': 3,
                'placeholder': 'Zadajte krátky popis článku...',
            }),
            'content': CKEditor5Widget(config_name='extends'),
            'visibility': forms.Select(choices=Article.VISIBILITY_CHOICES, attrs={'class': 'custom-select'}),
        }


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