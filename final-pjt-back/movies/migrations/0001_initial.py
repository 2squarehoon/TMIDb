# Generated by Django 3.2.12 on 2022-05-24 05:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title_id', models.CharField(max_length=10)),
                ('imdb_rating', models.FloatField()),
                ('num_votes', models.IntegerField()),
                ('title', models.CharField(max_length=40)),
                ('korean_title', models.CharField(max_length=40)),
                ('genres', models.CharField(max_length=30)),
                ('year', models.IntegerField()),
                ('language', models.CharField(max_length=10)),
                ('budget', models.CharField(max_length=50)),
                ('mc_rating', models.FloatField()),
                ('rt_rating', models.FloatField()),
                ('naver_rating', models.FloatField()),
                ('naver_count', models.IntegerField()),
                ('watcha_rating', models.FloatField()),
                ('watcha_count', models.CharField(max_length=10)),
                ('poster_url', models.CharField(max_length=200)),
                ('overview', models.TextField()),
                ('like_users', models.ManyToManyField(related_name='like_movies', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.IntegerField()),
                ('content', models.TextField()),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='movies.movie')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
