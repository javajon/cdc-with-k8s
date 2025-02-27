FROM node:20-slim

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy directories needed for tests
COPY consumer/ ./consumer/

# Create directories needed for pact
RUN mkdir -p pacts logs

# Set default environment variables for the Pact Broker
# These will be overridden by the docker run command
ENV PACT_BROKER_URL="http://localhost:30111"
ENV PACT_BROKER_USERNAME="pactbroker"
ENV PACT_BROKER_PASSWORD="pactbroker"

# Command to run tests and publish results
CMD ["sh", "-c", "npm run test:consumers && npm run test:publish"]
