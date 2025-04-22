#!/bin/bash
set -e

# Start Minikube if not running
if ! minikube status &>/dev/null; then
  echo "Starting Minikube..."
  minikube start --memory=4096 --cpus=2
fi

# Set Docker to use Minikube's Docker daemon
echo "Configuring Docker to use Minikube's Docker daemon..."
eval $(minikube docker-env)

# Build Docker images
echo "Building Docker images..."
docker build -t yourusername/backend:latest ./app/backend
docker build -t yourusername/frontend:latest ./app/frontend

# Create namespaces
echo "Creating namespaces..."
kubectl create namespace app --dry-run=client -o yaml | kubectl apply -f -
kubectl create namespace monitoring --dry-run=client -o yaml | kubectl apply -f -

# Deploy application
echo "Deploying application..."
kubectl apply -f kubernetes/deployments/ -n app
kubectl apply -f kubernetes/services/ -n app
kubectl apply -f kubernetes/ingress/ -n app

# Wait for deployments to be ready
echo "Waiting for deployments to be ready..."
kubectl rollout status deployment/backend-deployment -n app
kubectl rollout status deployment/frontend-deployment -n app

# Install Prometheus, Grafana, and Loki using Helm
echo "Installing monitoring stack..."

# Add Helm repositories if not already added
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

# Install Prometheus and Grafana
helm upgrade --install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --values kubernetes/helm-charts/prometheus-values.yaml \
  --create-namespace

# Install Loki
helm upgrade --install loki grafana/loki-stack \
  --namespace monitoring \
  --values kubernetes/helm-charts/loki-values.yaml

# Enable port forwarding for services
echo "Setting up port forwarding..."
kubectl port-forward svc/frontend-service 8080:80 -n app &
kubectl port-forward svc/backend-service 3001:80 -n app &
kubectl port-forward svc/prometheus-grafana 3000:80 -n monitoring &
kubectl port-forward svc/prometheus-kube-prometheus-prometheus 9090:9090 -n monitoring &

echo "Application deployed successfully!"
echo "Frontend: http://localhost:8080"
echo "Backend API: http://localhost:3001"
echo "Grafana: http://localhost:3000 (default credentials: admin/admin)"
echo "Prometheus: http://localhost:9090"
echo ""
echo "Press Ctrl+C to stop port forwarding"

# Wait for Ctrl+C
wait 