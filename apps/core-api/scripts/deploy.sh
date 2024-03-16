docker build -t core-api:latest -f ../Dockerfile.prod ../

image_id=$(docker images --filter=reference=core-api:latest --quiet)

docker tag $image_id crseupc.azurecr.io/core-api:latest
docker push crseupc.azurecr.io/core-api:latest