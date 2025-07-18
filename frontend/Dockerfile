# frontend/Dockerfile
FROM node:20

WORKDIR /web
COPY package*.json ./
RUN npm ci
COPY . .
ENV VITE_API_URL=http://backend:8000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
