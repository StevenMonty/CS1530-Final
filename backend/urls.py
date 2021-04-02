
from django.urls import path, re_path
from .views import current_user, UserList, students_list, students_detail

urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    re_path(r'students/$', students_list),
    re_path(r'students/(?P<pk>[0-9]+)$', students_detail),
]