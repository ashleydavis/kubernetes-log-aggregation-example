# Kubernetes log aggregation example

<a target="_blank" href="https://www.data-forge-notebook.com/"><img align="right" src="images/support1.png"></a>

This repo contains example code for an upcoming blog post. Check back later for a link to the blog post or [follow the developer on Twitter for updates](https://twitter.com/ashleydavis75).


This example demonstrates the simplest possible log aggregation for Kubernetes using a microservice (Loggy) and a DaemonSet so that the microservice is deployed to every node on the cluster.

## Directory structure


Vagrantfile         ->  Boot a Vagrant virtual machine for development with Docker preinstalled, this 
                        makes it easier to build and push Loggy's image to your container registry.
<a target="_blank" href="http://bit.ly/2t2cJu2"><img align="right" src="images/support2.png"></a>
loggy/              ->  Code and Dockerfile for the Loggy microservice.
scripts/
    dev/            ->  Scripts for installing the dev VM.
    docker/         ->  Scripts for building and pushing Docker images.
    kubernetes/     ->  YAML files for deployment to Kubernetes.

