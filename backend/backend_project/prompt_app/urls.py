from django.urls import path
# from .views import save_prompt_and_recommend, get_movies,save_initial_movies  
from .views import get_movies, save_initial_movies, get_initial_movies

urlpatterns = [
    # path('save-prompt-and-recommend/', save_prompt_and_recommend, name='save_prompt_and_recommend'),
    path('get-movies/', get_movies, name='get-movies'),
    path('save-initial-movies/', save_initial_movies, name="save-initial-movie"),
    path('get-initial-movies/', get_initial_movies, name="get_initial_movies"),
]
