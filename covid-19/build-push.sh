#!/bin/bash

./gradlew bootBuildImage --imageName=$REGISTRY/$(basename $PWD):3.0.0
docker push $REGISTRY/$(basename $PWD):3.0.0
