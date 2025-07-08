## How To Run Django
- Create your own python environment
```python -m venv <environment_name>```

- Activate the environment
```source <environment_name>/bin/activate```

- Enter the project directory
```cd backend_project```

- Install the software libraries found in requirements.txt

- Create a PostgreSQL database

- Configure database so it matches the current user. database configuration can be found settings.py

   ```DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': '<your_db_name>',
            'USER': '<your_db_user>',
            'PASSWORD': '<your_db_password>',
            'HOST': 'localhost',
            'PORT': '5432',
        }
    }```

- Run migrations to create required tables: 
    ```python manage.py makemigrations```
    ```python manage.py migrate```

- Inject_posterdb.py update the details on this file so it matches with the current user.

- Populate the database the inject_posterdb.py 
    ```python inject_posterdb.py```

- Create your own API key for the inject_posterdb.py. 
    Go to: https://developer.themoviedb.org/docs/getting-started

- Run the server
```python manage.py runserver```