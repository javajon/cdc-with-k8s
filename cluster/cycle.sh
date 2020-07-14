#!/bin/bash

kubectl delete -f h2-world.yaml 
kubectl delete -f world-pop.yaml 
kubectl delete -f covid-19.yaml 
kubectl delete -f aggregator.yaml 

if [[ "$*" == 'full' ]]
then
    # exit when any command fails
    set -e

    pushd ../h2-seeder
    ./build-push.sh
    popd
    pushd ../aggregator
    ./build-push.sh
    popd
    pushd ../covid-19
    ./build-push.sh
    popd
    pushd ../world-pop
    ./build-push.sh
    popd

    set +e
fi

kubectl apply -f h2-world.yaml 
kubectl apply -f world-pop.yaml 
kubectl apply -f covid-19.yaml 
kubectl apply -f aggregator.yaml 
