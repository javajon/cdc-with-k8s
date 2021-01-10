# Consumer-driven Contracts with Kubernetes

## Learn how to use the Pact Foundation's framework for CDC testing.

This project contains the source code for demonstating consumer-driven contact testing using [Pact](https://docs.pact.io/). The application aggregates population and COVID-19 datasources and presents data at an API gateway. The entire application and Pact testing runs on Kubernetes. 

<img src="/docs/demo-app-arch.png" alt="Demonstration application architecture"/>

There are 6 directories for the following purposes:

| Directory Name  | Purpose                                                |
|-----------------|--------------------------------------------------------|
| aggregator      | Public API gateway, aggregates data from _world-pop_ and _covid-19_ microservices. This is the API you will test with Pact. |
| cluster         | A collection of Kubernetes YAML based manifests that define how each microservice, Pod, Deployment, and Service will run on your Kubernetes cluster. |
| covid-19        | A microservice that serves the COVID-19 data, updated daily, for each country on our blue marble. |
| h2-seeder       | A small container that runs as an _initContainer_ that seeds the H2 database Pod when it starts. The data is the human population for all the countries and major cities on our blue marble. |
| pact            | Here is one consumer. The Node.js code is independent of the Kubernetes cluster and by running a Pact test it creates a Pact contract |
| world-pop       | A microservice that serves the world population data found in the H2 database. |

In summary, the aggregator serves data combining the daily COVID-19 metrics with the world population. Here is a networking representation the Pod relationships.

For a complete tutorial on how this all works follow this Katacoda scenario: [Consumer-driven Contracts with Kubernetes](https://katacoda.com/javajon/courses/kubernetes-pipelines/cdc-with-k8s)
