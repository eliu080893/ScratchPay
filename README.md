# ScratchPay
Take Home assessment for ScratchPay
Prompt : https://gitlab.scratchpay.com/-/snippets/33

## How to start up the application:
- Install all npm packages with:    `npm install`
- To start up under development mode:    `npm run dev`
- T0 start up under production mode:   `npm start`

## Alternatively start up the application with a Docker image
If you have Docker installed, you can run the application from a container. The application has been containerized and the image is saved in a Docker Hub Repo.
- Pull the image from Docker hub using:    `docker pull eliu080893/scratchpay:latest`
- Start the container using:     `docker run -dp 3000:3000 eliu080893/scratchpay:latest`
- Visit **http://localhost:3000/** to see the Front-end application.