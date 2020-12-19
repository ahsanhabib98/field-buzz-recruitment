# pull official base image
FROM node:13.12.0-alpine

# set working directory
RUN mkdir /app
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# add app
COPY . .

RUN npm i
RUN npm run build

# start app
CMD ["npm", "start"]