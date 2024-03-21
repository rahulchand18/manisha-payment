FROM node:18.13.0 AS builder

WORKDIR /usr/local/app/frontend

RUN npm install -g @angular/cli

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --configuration=production --source-map=false

FROM nginx:latest

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /usr/local/app/frontend/dist/ams-frontend/ /usr/share/nginx/html
