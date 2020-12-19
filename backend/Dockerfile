# Base Image
FROM python:3.6

# create and set working directory
RUN mkdir /app
WORKDIR /app

COPY requirements.txt /app/

# update environment dependencies
RUN pip3 install --upgrade pip

# Install project dependencies
RUN pip3 install -r requirements.txt

# Copy current directory code to working directory
COPY . /app/

EXPOSE 8888
CMD gunicorn cfehome.wsgi:application --bind 0.0.0.0:$PORT