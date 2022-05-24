from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.core.paginator import Paginator

from .models import Movie, Review
from .serializers.review import ReviewSerializer
from .serializers.movie import MovieSerializer

# Create your views here.
@api_view(['GET'])
def movie_list(request):
    movies = get_list_or_404(Movie)
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def movie_detail(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = MovieSerializer(movie)
    return Response(serializer.data)

@api_view(['POST'])
def review_create(request, movie_pk):
    user = request.user
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = ReviewSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(movie=movie, user=user)
        
        reviews = movie.reviews.all()
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['PUT', 'DELETE'])
def review_update_or_delete(request, movie_pk, review_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    review = get_object_or_404(Review, pk=review_pk)

    def update_review():
        if request.user == review.user:
            serializer = ReviewSerializer(instance=review, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                reviews = movie.reviews.all()
                serializer = ReviewSerializer(reviews, many=True)
                return Response(serializer.data)

    def delete_review():
        if request.user == review.user:
            review.delete()
            reviews = movie.reviews.all()
            serializer = ReviewSerializer(reviews, many=True)
            return Response(serializer.data)
    
    if request.method == 'PUT':
        return update_review()
    elif request.method == 'DELETE':
        return delete_review()

@api_view(['POST'])
def like_movie(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    user = request.user
    if movie.like_users.filter(pk=user.pk).exists():
        movie.like_users.remove(user)
        serializer = MovieSerializer(movie)
        return Response(serializer.data)
    else:
        movie.like_users.add(user)
        serializer = MovieSerializer(movie)
        return Response(serializer.data)

@api_view(['GET'])
def search(request, keyword):
    movies = Movie.objects.all()
    if keyword:
        movies = movies.filter(korean_title__icontains=keyword)
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)


def recommendation():
    imdb_rating = 7.9
    mc_rating = 75
    rt_rating = 87

    naver_rating = 9.41
    naver_count = 18696
    watcha_rating = 4.3
    watcha_rating *= 2
    watcha_count = '104만명'
    watcha_count.replace('만', '0000')
    watcha_count.replace(',', '')
    watcha_count.replace('명', '')
    watcha_count = int(watcha_count)/100

    user_or_critic = 8
    foreign_or_domestic = 7

    user_rating = imdb_rating
    critic_rating = (mc_rating + rt_rating) / 20
    user_or_critic_rating = user_rating*(10-user_or_critic) + critic_rating*user_or_critic

    foreign_rating = imdb_rating
    domestic_rating = (naver_rating*naver_count + watcha_rating*watcha_count) / (naver_count+watcha_count)
    foreign_or_domestic_rating = foreign_rating*(10-foreign_or_domestic) + domestic_rating*foreign_or_domestic

    result_value = user_or_critic_rating + foreign_or_domestic_rating
    return