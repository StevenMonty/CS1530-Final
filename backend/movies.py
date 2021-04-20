# probably dont need all these
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
from itertools import chain

from tmdbv3api import Movie, TMDb

tmdb = TMDb()
tmdb.api_key = '86c55e3a1810413caf10a4f40dc26944'

logger = logging.getLogger(__name__)

@api_view(['GET'])
def search_movies(request, query):
    """
    Pass movie name, return json of relevant movies and info
    """
    # search movie with tmdb api
    movie = Movie()
    # should probably sanitize query before using it
    # sorts found movies by release date, descending
    try:
        results = sorted(movie.search(query), key = lambda i: i['release_date'], reverse=True)
    except:
        results = movie.search(query)
    # replace poster_path with a URL to the poster
    for entry in results:
        poster = entry.poster_path
        entry.poster_path = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" + str(poster)



    # want to return movie name, release date, link to poster
    movies = []
    for entry in results:
        try:
            movies.append({
                'title':entry.title,
                'date':entry.release_date,
                'poster_url':entry.poster_path
            })
        except:
            # if the movie doesn't have a date, title or poster, dont add it
            continue
    return JsonResponse(movies, safe=False)

@api_view(['GET'])
def movie_info(request, query):
    """
    Pass exact movie title, returns json of single movie and relevant data
    """

    movie = Movie()

    results = movie.search(query)
    
    for result in results:
        if result.original_title == query:
            # send off movie if we found it
            movie = {
                'title':result.original_title,
                'overview':result.overview,
                'release_date':result.release_date,
                'language':result.original_language,
                'poster_url': "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" + str(result.poster_path)
            }

            return JsonResponse({'status':200, 'movie_data':movie})
    

    # if the query did not match a movie, return bad request
    return JsonResponse({'status':400, 'movie_data':None})
    
#path('search_movies/<str:query>', search_movies),
#path('search_movie/<str:query>', movie_info),
