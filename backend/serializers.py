from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User as djUser
from .models import Student, User, Media, Review


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = djUser
        fields = ('username')

# this will replace ^ once its setup right
class _UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('email', 'name', 'bio')

class MediaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Media
        fields = ('title', 'author', 'description')

class ReviewSerializer(serializer.ModelSerializer):
    
    class Meta:
        model = Review
        fields = ('media', 'poster', 'body', 'rating')


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
        # this can go back to user once .models User extends django.contrib.auth.models User
        model = djUser
        # then maybe update tese fields with those in .models User
        fields = ('token', 'username', 'password')


class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student 
        fields = ('pk', 'name', 'email', 'document', 'phone', 'registrationDate')
