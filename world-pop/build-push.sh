#!/bin/bash

./gradlew bootBuildImage --imageName=localhost:5000/$(basename $PWD):3.0.0
docker push localhost:5000/$(basename $PWD):3.0.0
