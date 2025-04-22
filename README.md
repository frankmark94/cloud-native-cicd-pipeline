# Cloud-native CI/CD Pipeline for Microservices with Kubernetes

This project demonstrates a fully automated CI/CD pipeline that deploys a microservices-based application onto a Kubernetes cluster. It leverages containerization with Docker, automates tests, performs vulnerability scanning, and implements Kubernetes deployment automation with GitOps principles.

![image](https://github.com/user-attachments/assets/a56c8884-85cd-4124-baeb-dd44f4d83005)


## Project Overview

The project consists of:
- A sample microservices application (Node.js Express API + React frontend)
- Docker containerization for each microservice
- CI/CD pipeline using GitHub Actions
- Kubernetes deployment manifests
- Infrastructure as Code using Terraform
- Observability stack with Prometheus, Grafana, and Loki

## Repository Structure

```
.
├── README.md                       # Project documentation
├── app/                            # Application code
│   ├── backend/                    # Backend microservice (Node.js/Express)
│   └── frontend/                   # Frontend microservice (React)
├── .github/workflows/              # GitHub Actions CI/CD workflows
├── kubernetes/                     # Kubernetes manifests
│   ├── deployments/                # Deployment configurations
│   ├── services/                   # Service configurations
│   ├── ingress/                    # Ingress configurations
│   └── helm-charts/                # Helm charts for application deployment
├── terraform/                      # Infrastructure as Code
│   ├── eks/                        # EKS cluster configuration
│   └── modules/                    # Reusable Terraform modules
└── observability/                  # Observability stack configurations
    ├── prometheus/                 # Prometheus configuration
    ├── grafana/                    # Grafana dashboards
    └── loki/                       # Loki configuration
```

## Getting Started

### Prerequisites

- Docker
- Kubernetes cluster (Minikube for local development or AWS EKS for production)
- kubectl
- Helm
- Terraform
- AWS CLI (if using AWS EKS)

### Local Development Setup

1. Clone this repository
2. Install dependencies
3. Start local Kubernetes cluster with Minikube:
   ```
   minikube start
   ```
4. Build and deploy the application:
   ```
   ./scripts/deploy-local.sh
   ```

### CI/CD Pipeline

The CI/CD pipeline is implemented using GitHub Actions and consists of the following stages:
1. Build and test
2. Security scanning with Trivy
3. Build and push Docker images
4. Deploy to Kubernetes
5. Run integration tests
6. Monitor deployment

## Infrastructure Setup

### Terraform

The infrastructure is defined as code using Terraform. To provision the infrastructure:

```
cd terraform
terraform init
terraform plan
terraform apply
```

### Kubernetes Deployment

The application is deployed to Kubernetes using Helm charts:

```
helm install myapp ./kubernetes/helm-charts/myapp
```

## Observability

The observability stack includes:
- Prometheus for metrics collection
- Grafana for visualization
- Loki for log aggregation

Access the dashboards at:
- Grafana: http://localhost:3000 (default credentials: admin/admin)
- Prometheus: http://localhost:9090

## Documentation

For more detailed documentation, see:
- [Architecture Overview](docs/architecture.md)
- [CI/CD Pipeline](docs/cicd.md)
- [Kubernetes Setup](docs/kubernetes.md)
- [Observability](docs/observability.md) 
