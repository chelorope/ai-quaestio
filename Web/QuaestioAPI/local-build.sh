mvn clean package
docker build --no-cache --platform=linux/amd64 -t quaestio .
docker rm quaestio
docker run -p 5050:5050 --name quaestio --env CLIENT_URL="http://localhost:2500" --platform=linux/amd64 quaestio