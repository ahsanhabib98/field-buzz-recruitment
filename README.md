# Field buzz recruitment assignment
####Run the following commands to get started(with docker):

````
docker-compose build
docker-compose up
````
After waiting for while, visit following urls:

* UI: http://localhost:3000/
####Run the following commands to get started manually(without docker):
###### For backend
````
cd backend
virtualenv --python=python3 venv
source venv/bin/activate
pip3 install -r requirements.txt
python3 manage.py runserver
````
###### For frontend
````
cd frontend
npm i
npm run build
npm start
````
After waiting for while, visit following urls:

* UI: http://localhost:3000/