
A Node.js-based microservice for log aggregation on Kubernetes.

To build this you need Docker installed and have your own registry on which to publish the image.

There are some shell scripts under /scripts/docker to build and push the image. 

Please read those scripts for further instructions.

To deploy this to Kubernetes as a Daemonset run:

    kubectl apply -f /script/kubernetes/loggy.yaml