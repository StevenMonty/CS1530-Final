
from django.urls import path, re_path
from .views import *
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [

    path('auth/login', obtain_jwt_token),
    path('auth/register', UserRegisterView.as_view()),
    path('auth/current_user', current_user),

    path('users/add_friend/<str:username>', add_friend),

    path('profile/<str:username>', get_user),
    # path('profile/search/<str:query>', search_user),  # Note: Deprecated, use /search instead

    path('search/<str:query>', search),

    path('media/feed', get_feed),
    path('media/list', list_media),
    path('media/add_rating', AddRatingView.as_view()),
]
