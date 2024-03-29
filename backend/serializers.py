from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from .models import *
# from .models import Student


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('pk', 'username', 'first_name', 'last_name')


class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password')


class LibrosProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = LibrosProfile
        fields = ('details', 'friends_list', 'library')


class LibrosSearchSerializer(serializers.ModelSerializer):

    class Meta:
        model = LibrosProfile
        fields = ('details',)


class MediaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Media
        fields = ('id', 'title', 'author', 'year', 'media_type', 'num_ratings')


class RatingSerializer(serializers.ModelSerializer):
    media = MediaSerializer(many=False)
    user = LibrosSearchSerializer(many=False)

    class Meta:
        model = Rating
        fields = ('id', 'stars', 'media', 'user')


