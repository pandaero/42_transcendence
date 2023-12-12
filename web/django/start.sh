#!/bin/sh

sleep 5
python3 manage.py migrate
python3 create_superuser.py
# -u is for debug mode
python3 -u manage.py runserver 0.0.0.0:8000