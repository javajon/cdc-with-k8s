# PINNED. node:24-slim bundles whatever npm the 24 line currently ships, and on
# 2026-10-14 node 24.22.0 moved that from npm 11.6.x to 11.19.1. The stricter npm
# then refused this lockfile outright - "Missing: @emnapi/core from lock file" - and
# `npm ci` failed the image build, which failed step 6 of the lab. Nothing in the lab
# had changed; the floating tag moved under it.
#
# 24.22.3-slim carries npm 11.19.1, the version package-lock.json is generated and
# verified against. Bump both together, deliberately.
FROM node:24.22.3-slim

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

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
