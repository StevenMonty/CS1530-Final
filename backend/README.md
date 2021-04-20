# Backend:


### Authorization
* GET `api/auth/login`: User Login and obtain JWT Token
    * Request body:
    ```json
        {
            "username": "smontalbano",
            "password": "<PASSWORD>"
        }   
    ```
    * Response:
    ```json
        {
            "JWT": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InNtb250YWxiYW5vIiwiZXhwIjoxNjE4ODkyMDM3LCJlbWFpbCI6InNtbTI4NUBwaXR0LmVkdSJ9.470tAMQlbIEOaHTvpXmEvSm3GWqR00TNppSzVMqVvDA",
            "user": {
                "pk": 1,
                "username": "smontalbano",
                "first_name": "Steven",
                "last_name": "Montalbano"
            }
        }
    ```
* POST `api/auth/register`: Create a new user
    * Request body:
    ```json
    {
        "username": "montalbano",
        "email": "montalbano@pitt.edu",
        "first_name": "Steven",
        "last_name": "Monty",
        "password": "root"
    }
    ```
   * Response:
    ```json
    {
        "status": 200,
        "message": "User montalbano successfully created!",
        "id": 6
    }
    ```
  
### User Profiles + Searching
  
* POST `api/users/add_friend/<str:username>`: Add user to your friends via username
   * Request: `api/users/add_friend/admin`
   * Response:
    ```json
    {
        "status": 200,
        "message": "smontalbano successfully added admin as a friend!"
    }
    ```

* GET `api/profile/<str:username>`: Get a user profile by their Libros ID number
    * Request: `api/profile/smontalbano`
    * Response: 
    ```json
        {
            "details": {
                "id": 1,
                "first_name": "Steven",
                "last_name": "Montalbano",
                "email": "smm285@pitt.edu",
                "last_active": "2021-04-05T18:19:43.683819Z",
                "friend_count": 1,
                "lib_size": 1
            },
            "friends_list": [
                {
                    "id": 2,
                    "first_name": "Libros",
                    "last_name": "Admin",
                    "email": "admin@pitt.edu",
                    "last_active": "2021-04-08T19:59:45.768679Z"
                }
            ],
            "library": [
                {
                    "title": "Avengers Endgame",
                    "author": "NA",
                    "type": "MOVIE",
                    "rating": 5
                }
            ]
        }
    ```
  
* GET `api/search/<str:query>`: Search for users and media in the DB via substring match on user email, first name, last name, and username and media by title and author 
    * Request: `api/search/pitt`
    * Response 1 result on first name: 
        ```json
            {
                "status": 200,
                "users": [
                    {
                        "details": {
                            "id": 1,
                            "first_name": "Steven",
                            "last_name": "Montalbano",
                            "email": "smm285@pitt.edu",
                            "last_active": "2021-04-05T18:19:43.683Z",
                            "friend_count": 1,
                            "lib_size": 1
                        }
                    }
                ],
                "media": [
                    {
                        "title": "The OA",
                        "author": "Brad Pitt",
                        "year": 2016,
                        "media_type": "TV"
                    }
                ]
            }
        ```

### Media Iterations
* GET `media/feed`: Get all ratings for the current users and their friends
    * Response:
    ```json
        {
            "status": 200,
            "items": [
                {
                    "id": 1,
                    "media": {
                        "id": 1,
                        "title": "Avengers Endgame",
                        "author": "NA",
                        "year": 2019,
                        "media_type": "MOVIE",
                        "num_ratings": 2
                    },
                    "user": {
                        "details": {
                            "id": 1,
                            "first_name": "Steven",
                            "last_name": "Montalbano",
                            "email": "smm285@pitt.edu",
                            "last_active": "2021-04-05T18:19:43.683Z",
                            "friend_count": 2,
                            "lib_size": 2
                        }
                    },
                    "stars": 5
                },
                {
                    "id": 2,
                    "media": {
                        "id": 2,
                        "title": "The OA",
                        "author": "Brad Pitt",
                        "year": 2016,
                        "media_type": "TV",
                        "num_ratings": 2
                    },
                    "user": {
                        "details": {
                            "id": 6,
                            "first_name": "Steven",
                            "last_name": "Monty2",
                            "email": "montalbano@pitt.edu",
                            "last_active": null,
                            "friend_count": 1,
                            "lib_size": 2
                        }
                    },
                    "stars": 2
                }
            ]
        }
    ```
* GET `api/media/list`: List all media currently in the DB
    * Request: `api/media/list`
    * Response:
    ```json
        [
            {
                "id": 1,
                "title": "Avengers Endgame",
                "author": "NA",
                "year": 2019,
                "media_type": "MOVIE",
                "num_ratings": 1
            },
            {
                "id": 2,
                "title": "The OA",
                "author": "Brad Pitt",
                "year": 2016,
                "media_type": "TV",
                "num_ratings": 0
            }
        ]
    ```
  
* POST `api/media/add_rating`: Add a new rating to a media object by its ID
    * Request Body:
    ```json
        {
            "media_id": 2,
            "rating": 5
        }
    ``` 
    * Response:
    ```json
        {
            "status": 200
        }
    ```

* GET `api/search_movies/<str:query>`: Search for any movie in external DB. Returns list of relevant omvies
    * Request: `api/search_movies/Inglorious`
    * Response unlimited results on movie name: 
        ```json
            [
                {
                "movies": [
                        {
                            "title": "The Inglorious Bastards",
                            "date": "1978-02-08",
                            "poster_url": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8f7PoX7TveyKrndh3bZZcBvR55Z.jpg"

                        }
                    ]
                }
            ]
        ```

* GET `api/search_movie/<str:query>`: Search for an individual movie in external DB. Returns movie data
    * Request: `api/search_movie/Blade`
    * Response unlimited results on movie name: 
         ```json
            {
                "status": 200/400,
                "movie_data":
                    {
                        "title": "Blade",
                        "overview": "The Daywalker known as \"Blade\" - a half-vampire, half-mortal man - becomes the protector of humanity against an underground army of vampires.", 
                        "release_date": "1998-08-21", 
                        "language": "en", 
                        "poster_url": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/e6ErRnIgKmoBtcKpht3amsMfo52.jpg"
                    }
            }
        ```