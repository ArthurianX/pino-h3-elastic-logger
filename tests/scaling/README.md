# Test scaling of the api and ElasticSearch/Kibana services

## How to test locally 

Install `minikube` from [Minikube](https://minikube.sigs.k8s.io/docs/start/)
>minikube quickly sets up a local Kubernetes cluster on macOS, Linux, and Windows. We proudly focus on helping application developers and new Kubernetes users.

## Testing details

The idea is to have the auto-scaling cluster behind a load balancer then hit the balancer with many requests, see the cluster scale and check to see each instance if it has received data and that no data is lost
