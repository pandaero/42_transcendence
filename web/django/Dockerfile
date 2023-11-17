# Use an official Python runtime as a parent image
FROM python:3.10-alpine

# Set the working directory in the container to /code
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install any needed packages specified in requirements.txt

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run manage.py when the container launches
# CMD ["tail", "-f", "/dev/null"]

WORKDIR /code
# CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
 CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]