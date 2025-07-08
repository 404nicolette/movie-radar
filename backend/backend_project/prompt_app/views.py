from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from ml_engine.models import MoviesTable

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import InitialMovie
from ml_engine.models import MoviesTable








# this access the db in order to display posters that exists in the db
@api_view(['GET'])
def get_movies(request):
    movies = MoviesTable.objects.all().values("movie_id", "movie_title", "poster_path")
    return Response(list(movies))


# stores the movie id to the initial_movie table
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_initial_movies(request):
    movie_ids = request.data.get('movie_ids', [])
    user = request.user


    print("Received movie_ids:", movie_ids)
    print("Authenticated user:", user)

    if movie_ids and user:
        for movie_id in movie_ids:
            InitialMovie.objects.create(
                movie_id=movie_id,
                user=user 
            )

        return Response({"message": "Movies saved successfully."})
    else:
        return Response({"error": "Missing movie IDs or user info."}, status=400)
    


# display movies that are saved in the initial_movies tabel 

@api_view(['GET'])
def get_initial_movies(request):
    saved_movie_ids = InitialMovie.objects.all().values("movie_id")
    movies = MoviesTable.objects.filter(movie_id__in=saved_movie_ids).values("movie_id", "movie_title","poster_path")
    return Response(list(movies))
