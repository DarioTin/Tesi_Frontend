docker build . -t frontend

docker tag frontend dariotintore/frontend
docker push dariotintore/frontend
