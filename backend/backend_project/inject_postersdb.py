import time
import requests
import psycopg2



conn = psycopg2.connect(
    dbname="RecommenderDB",
    user="postgres",
    password="animolasalle.888",
    host="localhost",
    port="5432"
)



cursor = conn.cursor()

# get all movie_ids
cursor.execute("SELECT movie_id FROM movies_table;")
movie_ids = cursor.fetchall()


API_KEY = "d2267179100e5e1ce31d778fb2deab55"
BASE_URL = "https://api.themoviedb.org/3/movie/"

for movie_id_tuple in movie_ids:
    movie_id = movie_id_tuple[0] 

    # combine to form the specific url of the movie
    url = f"{BASE_URL}{movie_id}?api_key={API_KEY}"

    try:
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            poster_path = data.get("poster_path")
            if poster_path:
                cursor.execute(
                    "UPDATE movies_table SET poster_path = %s WHERE movie_id = %s;",
                    (poster_path, movie_id)
                )
                conn.commit()
        else:
            print(f"Failed to fetch movie {movie_id}: {response.status_code}")
    except Exception as e:
        print(f"Error for movie {movie_id}: {e}")

    time.sleep(0.1)

cursor.close()
conn.close()