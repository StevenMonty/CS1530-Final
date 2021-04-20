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

* GET `api/profile/<int:id>`: Get a user profile by their Libros ID number
    * Request: `api/profile/1`
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
  
* GET `api/profile/search/<str:query>`: Search existing users by email, first name, last name, and username substring matches
    * Request: `api/profile/search/steven`
    * Response 1 result on first name: 
        ```json
            [
                {
                    "details": {
                        "id": 1,
                        "first_name": "Steven",
                        "last_name": "Montalbano",
                        "email": "smm285@pitt.edu",
                        "last_active": "2021-04-05T18:19:43.683819Z",
                        "friend_count": 1,
                        "lib_size": 1
                    }
                }
            ]
        ```
    * Request: `api/profile/search/pitt`
    * Response multi-result on email: 
        ```json
            [
                {
                    "details": {
                        "id": 1,
                        "first_name": "Steven",
                        "last_name": "Montalbano",
                        "email": "smm285@pitt.edu",
                        "last_active": "2021-04-05T18:19:43.683819Z",
                        "friend_count": 1,
                        "lib_size": 1
                    }
                },
                {
                    "details": {
                        "id": 2,
                        "first_name": "Libros",
                        "last_name": "Admin",
                        "email": "admin@pitt.edu",
                        "last_active": "2021-04-08T19:59:45.768679Z",
                        "friend_count": 1,
                        "lib_size": 0
                    }
                }
            ]
        ```
    

## URLs Needed
* /feed: Get current user's feed
* /profile: Get current user's profile, friends, library, etc. 
* /profile/id: Get specific user's profile and all associated data
* /add_friend: Add a friend from current user
* /add_rating: Add a media to the DB if not present and a new rating from cur user
