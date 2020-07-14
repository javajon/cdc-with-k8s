#!/bin/bash

docker build -t localhost:5000/$(basename $PWD):0.0.1 .
docker push localhost:5000/$(basename $PWD):0.0.1
