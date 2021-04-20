
from django.urls import path, re_path
from .views import *

urlpatterns = [
    path('users/register', UserRegisterView.as_view()),
    path('users/add_friend/<str:username>', add_friend),

    path('profile/<str:username>', get_user),
    # path('profile/search/<str:query>', search_user),  # Note: Deprecated, use /search instead

    path('search/<str:query>', search),




    path('current_user/', current_user),
    # path('users/', UserList.as_view()),

    #     re_path(r'students/$', students_list),
#     re_path(r'students/(?P<pk>[0-9]+)$', students_detail),
]