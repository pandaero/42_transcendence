#!/bin/sh

# python3 manage.py makemigrations --verbosity=3
sleep 6
python3 manage.py migrate --verbosity=3
python3 create_superuser.py
python3 manage.py runserver 0.0.0.0:8000