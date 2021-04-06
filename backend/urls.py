
from django.urls import path, re_path
from .views import *

urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    path('profile/id/', get_user),
    path('add_friend/', add_friend),
#     re_path(r'students/$', students_list),
#     re_path(r'students/(?P<pk>[0-9]+)$', students_detail),
]