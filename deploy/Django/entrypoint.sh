#!/bin/bash

export TMDB_API_KEY=86c55e3a1810413caf10a4f40dc26944
cd /django_app && python manage.py runserver 0.0.0.0:8000
