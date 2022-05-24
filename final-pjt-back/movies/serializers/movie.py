from rest_framework import serializers
from ..models import Movie
from .review import ReviewSerializer
from django.contrib.auth import get_user_model


User = get_user_model()

class MovieSerializer(serializers.ModelSerializer):

    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('pk', 'username')

    reviews = ReviewSerializer(many=True, read_only=True)
    like_users = UserSerializer(read_only=True, many=True)

    class Meta:
        model = Movie
        fields = ('pk', 'imdb_rating', 'num_votes', 'korean_title', 'genres', 'year', 'budget', 'mc_rating', 'rt_rating', 'naver_rating', 'naver_count', 'watcha_rating', 'watcha_count', 'poster_url', 'overview', 'reviews', 'like_users',)