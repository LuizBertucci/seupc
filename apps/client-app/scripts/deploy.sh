docker build -t client-app:latest ../

image_id=$(docker images --filter=reference=client-app:latest --quiet)

docker tag $image_id crseupc.azurecr.io/client-app:latest
docker push crseupc.azurecr.io/client-app:latest