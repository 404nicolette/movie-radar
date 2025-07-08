from django.urls import path
from .views import cbf_recommendations, cf_recommendations, hybrid_recommendations

urlpatterns = [
    path("", cbf_recommendations, name="cbf_recommendations"),
    path("", cf_recommendations, name="cf_recommendations"),
    path("", hybrid_recommendations, name="hybrid_recommendations"),

]
