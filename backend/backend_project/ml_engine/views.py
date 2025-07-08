from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import os
import pandas as pd
import numpy as np
from .models import MoviesTable
from rest_framework.decorators import api_view
from prompt_app.models import InitialMovie


# Create your views here.




# CSV
csv_path = os.path.join(os.path.dirname(__file__), "movie_id_to_index.csv")
mapped = pd.read_csv(csv_path)

# CBF
cbf_matrix_path = os.path.join(os.path.dirname(__file__), "cbf_similarity_matrix.npy")
cbf_matrix = np.load(cbf_matrix_path)

# CF
cf_matrix_path = os.path.join(os.path.dirname(__file__), "cf_similarity_matrix.npy")
cf_matrix = np.load(cf_matrix_path)

@csrf_exempt
def cbf_recommendations(request):
    try:
        data = json.loads(request.body)
        
        # extract movie_ids from the parsed json body
        movie_ids = data.get("movie_ids") 
        print(movie_ids)
        if not movie_ids:
            return JsonResponse({"err": "movie_ids is missing or empty in the request"}, status=400)

        movie_ids = [int(id) for id in movie_ids]

        recommendation_data = []

        for movie_id in movie_ids:
            if movie_id not in mapped["movie_id"].values:
                return JsonResponse({"err": f"movie_id {movie_id} not found in the mapping"}, status=400)
            
            # get the index from the mapping
            movie_index = mapped[mapped["movie_id"] == movie_id]["index"].values[0]
            
            # get sim scores for that movie 
            movie_scores = cbf_matrix[movie_index]
            
            # this gets the top 3 of each movies
            # for example the movie i 'liked' are batman, lego, toy story
            # this gets the top 3 highest similarity of batman (3), then lego (3), then toy story(3
            # sso in the end it retuns a total of 9 movies
            # this line only gets the similarity score not the actual movie details
            recommended_indices = movie_scores.argsort()[-3:][::-1]
            
            # make sures recommended movie ids are unique 
            recommended_movie_ids = list(set(mapped.iloc[recommended_indices]["movie_id"].values))

            recommendations = MoviesTable.objects.filter(movie_id__in=recommended_movie_ids)

            for i, movie in enumerate(recommendations):
                if i >= 3:  # ensure only add 3 recommendations per movie_id
                    break
                recommendation_data.append({
                    "movie_id": movie.movie_id,
                    "title": movie.movie_title,
                })

        return JsonResponse(recommendation_data, safe=False)

    except Exception as e:
        return JsonResponse({"err": str(e)}, status=400)


# ------ CF ------

def cf_recommendations(request):
    try:
        data = json.loads(request.body)
        
        movie_ids = data.get("movie_ids")
        
        
        if not movie_ids:
            return JsonResponse({"err": "movie_ids is missing or empty in the request"}, status=400)

        movie_ids = [int(id) for id in movie_ids]
        recommendation_data = []

        for movie_id in movie_ids:
            if movie_id not in mapped["movie_id"].values:
                return JsonResponse({"err": f"movie_id {movie_id} not found in the mapping"}, status=400)
            
            movie_index = mapped[mapped["movie_id"] == movie_id]["index"].values[0]
            
            movie_scores = cf_matrix[movie_index]
        
            recommended_indices = movie_scores.argsort()[-3:][::-1]
            
            recommended_movie_ids = list(set(mapped.iloc[recommended_indices]["movie_id"].values))

            recommendations = MoviesTable.objects.filter(movie_id__in=recommended_movie_ids)

            for i, movie in enumerate(recommendations):
                if i >= 3: 
                    break
                recommendation_data.append({
                    "movie_id": movie.movie_id,
                    "title": movie.movie_title,
                })

        return JsonResponse(recommendation_data, safe=False)

    except Exception as e:
        return JsonResponse({"err": str(e)}, status=400)
    

# # ------ HYBRID ------
@api_view(["POST"])
def hybrid_recommendations(request):
    try:
        # data = json.loads(request.body)
        movie_ids = request.data.get("movie_ids")
        
        # if not movie_ids:
        #     return JsonResponse({"err": "movie_ids is missing or empty in the request"}, status=400)

        movie_ids = [int(id) for id in movie_ids]

        all_recommendations = []

        for movie_id in movie_ids:


            # api has more data than the db so some movie_id will not exist
            if movie_id not in mapped["movie_id"].values:
                continue  
            


            # if movie_id not in mapped["movie_id"].values:
            #     return JsonResponse({"err": f"movie_id {movie_id} not found in the mapping"}, status=400)
            
            movie_index = mapped[mapped["movie_id"] == movie_id]["index"].values[0]
            cbf_scores = cbf_matrix[movie_index] 
            cf_scores = cf_matrix[movie_index]



            # i chose a specifc ratio for the weight
            # i leaned more towards cbf as it is more suited to handle cold strt
            #  the data i am working with are cleaned and pre-processed with no null values
            # so all metadata are in tact plus practically speaking, i do not have enough
            # user data to fullt explore get the benefit of cf
            hybrid_scores = (0.6 * cbf_scores) + (0.4 * cf_scores)

            recommended_indices = hybrid_scores.argsort()[-3:][::-1]

            recommended_movie_ids = mapped.iloc[recommended_indices]["movie_id"].values

            recommendations = MoviesTable.objects.filter(movie_id__in=recommended_movie_ids)

            for movie in recommendations:
                all_recommendations.append({
                    "movie_id": movie.movie_id,
                    "title": movie.movie_title,
                    "hybrid_score": hybrid_scores[recommended_indices.tolist().index(movie.movie_id)]
                })


        # gothrough the recommendations and insert them in sorted order
        sorted_recommendations = []
        for recommendation in all_recommendations:
            inserted = False
            for i in range(len(sorted_recommendations)):
                # lower hybrid score are put at a backburner
                if recommendation["hybrid_score"] > sorted_recommendations[i]["hybrid_score"]:
                    sorted_recommendations.insert(i, recommendation)
                    inserted = True
                    break
            if not inserted:
                sorted_recommendations.append(recommendation)


        top_recommendations = all_recommendations[:3]

        return JsonResponse(top_recommendations, safe=False)

    except Exception as e:
        return JsonResponse({"err": str(e)}, status=400)
