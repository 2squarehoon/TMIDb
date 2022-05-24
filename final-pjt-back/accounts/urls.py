from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('profile/<username>/', views.profile),
    # path('proflle/<username>/update/', views.profile_update),
]
