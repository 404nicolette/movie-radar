import os
import pandas as pd
from sqlalchemy import create_engine, text

# CSV Path
csv_path = os.path.join(os.path.dirname(__file__), "for_movie_table.csv")
df = pd.read_csv(csv_path)



engine = create_engine('postgresql://postgres:animolasalle.888@localhost:5432/RecommenderDB')

create_table_sql = '''
    CREATE TABLE IF NOT EXISTS movies_table (
        id BIGINT PRIMARY KEY NOT NULL,
        title VARCHAR(255)
    );
'''

with engine.connect() as conn:
    conn.execute(text(create_table_sql))

df.to_sql('movies_table', engine, if_exists='replace', index=False)

# code to run the script --> python to_postgres.py