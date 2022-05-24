from rest_framework import serializers
from django.contrib.auth import get_user_model
from articles.models import Article
from dj_rest_auth.registration.serializers import RegisterSerializer

class ProfileSerializer(serializers.ModelSerializer):

    class ArticleSerializer(serializers.ModelSerializer):
        
        class Meta:
            model = Article
            fields = ('pk', 'title', 'content')

    like_articles = ArticleSerializer(many=True, read_only=True)
    articles = ArticleSerializer(many=True, read_only=True)

    class Meta:
        model = get_user_model()
        fields = ('pk', 'username', 'email', 'like_articles', 'articles', 'user_or_critic', 'foreign_or_domestic')

class CustomRegisterSerializer(RegisterSerializer):
    user_or_critic = serializers.IntegerField()
    foreign_or_domestic = serializers.IntegerField()
    
    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['user_or_critic'] = self.validated_data.get('user_or_critic', '')
        data['foreign_or_domestic'] = self.validated_data.get('foreign_or_domestic', '')
        return data