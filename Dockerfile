FROM node:lts-alpine AS build-stage

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
# RUN npm install react-scripts -g

# add app
COPY . ./

# build app
RUN npm run build


FROM nginx as release-stage

COPY --from=build-stage /app/deploy/nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default deploy website
SHELL ["/bin/bash", "-c", "rm -rf /usr/share/nginx/html/"]

COPY --from=build-stage /app/build /var/www

EXPOSE 80

CMD ["nginx", "-c", "/etc/nginx/nginx.conf", "-g", "daemon off;"]

