from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.contrib.auth.models import User
from django.db.utils import IntegrityError
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status, permissions
from django.db.models import Q
import logging
# from .models import Student
from .serializers import *
from .models import *

logger = logging.getLogger(__name__)


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(['GET'])
def get_user(request, id):
    """
    Return the user specified by id (the requested user pk)
    """
    profile = LibrosProfile.objects.get(pk=id)
    serializer = LibrosProfileSerializer(profile)
    return Response(serializer.data)


@api_view(['GET'])
def search_user(request, query):
    """
    """
    results = LibrosProfile.objects.filter(
            Q(user__email__contains=query) |
            Q(user__first_name__contains=query) |
            Q(user__last_name__contains=query) |
            Q(user__username__contains=query)
    )
    serializer = LibrosSearchSerializer(results, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def add_friend(request):
    user = request.user
    # again, not sure how frontend will identify users
    friend_pk = request.POST.get("friend_pk")
    friend_profile = LibrosProfile.objects.get(pk=friend_pk)

    user.friends.add(friend_profile)
    user.save()

    # not sure what to return
    return 1
    

class UserRegisterView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        print(f'Create User, req: {request}, POST: {request.data}')
        try:
            user = User.objects.create_user(**request.data)
            user.set_password(request.data['password'])
            user.save()
            return JsonResponse({'status': 200, 'message': f'User {user} successfully created!', 'id': LibrosProfile.objects.get(user=user).id})
        except IntegrityError:
            return JsonResponse({'status': 400, 'message': f'Error, User already exists'})
        except Exception as e:
            return JsonResponse({'status': 500, 'message': f'Error: {str(e)}'})


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# @api_view(['GET', 'POST'])
# def students_list(request):
#     logger.debug(f'student_list req: {request}')
#     if request.method == 'GET':
#         data = Student.objects.all()
#
#         serializer = StudentSerializer(data, context={'request': request}, many=True)
#
#         print(serializer.data)
#
#         return Response(serializer.data)
#
#     elif request.method == 'POST':
#         serializer = StudentSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(status=status.HTTP_201_CREATED)
#
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#
# @api_view(['PUT', 'DELETE'])
# def students_detail(request, pk):
#     try:
#         student = Student.objects.get(pk=pk)
#     except Student.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#
#     if request.method == 'PUT':
#         serializer = StudentSerializer(student, data=request.data, context={'request': request})
#         if serializer.is_valid():
#             serializer.save()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     elif request.method == 'DELETE':
#         student.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
