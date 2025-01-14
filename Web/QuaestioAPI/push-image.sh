docker build --platform=linux/amd64 -t quaestio .
docker tag quaestio chelorope/quaestio
docker push chelorope/quaestio