#!/bin/bash

export PACT_BROKER_URL=<PACT_BROKER_URL here>
export PACT_API_TOKEN=<API_TOKEN here>

npm run test:consumer
npm run publish:pact
