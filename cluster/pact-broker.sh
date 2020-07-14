#!/bin/bash

helm install my-pact-broker ../pact-broker-chart --set service.type=NodePort --set service.nodePort=30111 