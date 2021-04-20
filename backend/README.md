## Endpoints:

* POST `api/users/register`: Create a new user
    * Request:
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

## URLs Needed
* /feed: Get current user's feed
* /add_rating: Add a media to the DB if not present and a new rating from cur user