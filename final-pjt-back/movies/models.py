from django.db import models

# Create your models here.
class Movie(models.Model):
    title_id = models.CharField(max_length=10)
    imdb_rating = models.FloatField()
    num_votes = models.IntegerField()
    title = models.CharField(max_length=40)
    korean_title = models.CharField(max_length=40)
    genres =models.CharField(max_length=30)
    year = models.IntegerField()
    language = models.CharField(max_length=10)
    budget = models.CharField(max_length=50)
    mc_rating = models.FloatField()
    rt_rating = models.FloatField()
    naver_rating = models.FloatField()
    naver_count = models.IntegerField()
    watcha_rating = models.FloatField()
    watcha_count = models.CharField(max_length=10)
    poster_url = models.CharField(max_length=200)
    overview = models.TextField()