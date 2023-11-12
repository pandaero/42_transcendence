FROM python:3.10-alpine3.18

WORKDIR /

COPY requirements.txt ./

RUN pip install -r requirements.txt

RUN django-admin startproject backend

WORKDIR /backend

# CMD tail -f /dev/null
CMD [ "python3", "manage.py" , "runserver" ]