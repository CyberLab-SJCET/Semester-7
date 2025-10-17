FROM node:18-alpine

# Install PostgreSQL client for the health check
RUN apk add --no-cache postgresql-client

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Copy initialization script
COPY docker/init.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["npm", "start"]