# Project Name

This repository contains the source code for a web application with frontend and
backend services.

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. Clone this repository.
2. Navigate to the project directory.
3. Run `docker-compose up` to start the application.

## Services

### Frontend

- Port: 80
- Dockerfile: ./frontend/Dockerfile

### Backend

- Port: 8000
- Environment Variable: OPENAI_API_KEY
- Dockerfile: ./backend/Dockerfile

## Configuration

Make sure to set the `OPENAI_API_KEY` environment variable for the backend
service.

## License

This project is licensed under the MIT License.
