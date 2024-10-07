FROM node:lts-alpine AS frontend-builder

WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

FROM golang:alpine AS backend-builder

WORKDIR /app
COPY backend/ /app
RUN go build -o /tmp/feleves-project -ldflags "-s -w"

FROM alpine

WORKDIR /app
COPY --from=frontend-builder /app/build /app/static
COPY --from=backend-builder /tmp/feleves-project /app/feleves-project

CMD [ "/app/feleves-project" ]