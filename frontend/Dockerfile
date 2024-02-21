FROM node:20 as build

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install

COPY frontend .
COPY types /types

RUN npm run build

# Production stage
FROM nginx:stable-alpine as production

COPY --from=build /app/dist /usr/share/nginx/html

# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]