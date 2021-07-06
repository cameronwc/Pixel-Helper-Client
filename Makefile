build:
	docker build -t pixel-helper-client:latest .
	docker run -it -p 3000:3000 pixel-helper-client:latest
