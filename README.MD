# Kubernetes log aggregation example

<a target="_blank" href="http://bit.ly/2o0aDsP"><img align="right" src="images/support.png"></a>

This repo contains example code for [the related blog post](http://the-data-wrangler/kubernetes-log-aggregation/). 

[Click here to support my work](https://www.codecapers.com.au/about#support-my-work)

This example demonstrates the simplest possible log aggregation for Kubernetes using a microservice (Loggy) and a DaemonSet so that the microservice is deployed to every node on the cluster.

| Directory structure |  |
| --- | --- |
| Vagrantfile | Boot a Vagrant virtual machine for development with Docker preinstalled, this makes it easier to build and push Loggy's image to your container registry. |
| loggy/ | Code and Dockerfile for the Loggy microservice. |
| scripts/ |
| &nbsp;&nbsp;&nbsp;&nbsp;dev/ | Scripts for installing the dev VM.
| &nbsp;&nbsp;&nbsp;&nbsp;docker/ | Scripts for building and pushing Docker images.
| &nbsp;&nbsp;&nbsp;&nbsp;kubernetes/ | YAML files for deployment to Kubernetes.
