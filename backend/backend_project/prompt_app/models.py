
from django.db import models
from django.contrib.auth.models import User

class InitialMovie(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='initial_movies')
    movie_id = models.IntegerField()

    class Meta:
        db_table = 'initial_movies'
        
    def __str__(self):
        return f"User {self.user.username} - Movie ID {self.movie_id}"
