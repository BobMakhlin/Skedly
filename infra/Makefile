all: third-party app

third-party:
	@echo "Installing MySQL via Helm..."
	helm upgrade --install mysql bitnami/mysql \
    		--version 13.0.3 \
    		--namespace default \
    		--values ./mysql-values.yaml

app:
	@echo "Applying API manifests..."
	kubectl apply -f ../skedly-api/k8s
#	@echo "Applying UI manifests..."
#	kubectl apply -f ../skedly-ui/k8s
