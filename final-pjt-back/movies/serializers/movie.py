from rest_framework import serializers
from ..models import Movie
from .review import ReviewSerializer


class MovieSerializer(serializers.ModelSerializer):

    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = ('imdb_rating', 'num_votes', 'korean_title', 'genres', 'year', 'budget', 'mc_rating', 'rt_rating', 'naver_rating', 'naver_count', 'watcha_rating', 'watcha_count', 'poster_url', 'reviews')