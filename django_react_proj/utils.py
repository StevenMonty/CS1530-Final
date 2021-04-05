from backend.serializers import UserSerializer


def my_jwt_response_handler(token, user=None, request=None):
    return {
        'JWT': token,
        'user': UserSerializer(user, context={'request': request}).data
    }