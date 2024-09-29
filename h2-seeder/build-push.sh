#!/bin/bash

docker build -t localhost:5000/$(basename $PWD):3.0.0 .
docker push localhost:5000/$(basename $PWD):3.0.0
