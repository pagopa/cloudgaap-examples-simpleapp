all: build run

delete:
	docker image rm test-app

build:
	pack build test-app -e BPE_PSQL_CONNECTION=postgresql://postgres:password@172.17.0.3/postgres  --buildpack gcr.io/paketo-buildpacks/nodejs --builder paketobuildpacks/builder:base

run:
	docker run --name test-app --rm -p 3000:3000 test-app

postgres:
	docker run --name postgress-app -e POSTGRES_HOST_AUTH_METHOD=trust --rm -p 5432:5432 postgres