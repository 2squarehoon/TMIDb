from django.urls import path
from . import views

app_name = 'movies'

urlpatterns = [
    path('', views.movie_list),
    path('<int:movie_pk>/', views.movie_detail),
    path('<int:movie_pk>/review/', views.review_create),
    path('<int:movie_pk>/review/<int:review_pk>/', views.review_update_or_delete),
    path('<int:movie_pk>/like/', views.like_movie),
]