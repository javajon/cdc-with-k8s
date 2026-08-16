#!/bin/bash

docker build -t $REGISTRY/$(basename $PWD):3.0.0 .
docker push $REGISTRY/$(basename $PWD):3.0.0
