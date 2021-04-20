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

## URLs Needed
* /feed: Get current user's feed
* /add_rating: Add a media to the DB if not present and a new rating from cur user
