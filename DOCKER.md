<!-- # Docker Deployment Guide

This guide explains how to build and run the backend application using Docker.

## 🐳 Docker Files Overview

- **`Dockerfile`** - Multi-stage Docker image for the Node.js backend
- **`.dockerignore`** - Excludes unnecessary files from Docker build context
- **`docker-compose.yml`** - Development environment with MySQL
- **`docker-compose.prod.yml`** - Production environment configuration
- **`.env.example`** - Example environment variables

## 🚀 Quick Start

### 1. Build the Docker Image

```bash
# Build the backend image
docker build -t book-author-api .
```

### 2. Run with Docker Compose (Recommended)

```bash
# Development environment
docker-compose up -d

# Production environment
cp .env.example .env
# Edit .env with your values
docker-compose -f docker-compose.prod.yml up -d
```

### 3. Run Single Container

```bash
# Run the container
docker run -d \
  --name book-author-api \
  -p 3200:3200 \
  -e DB_HOST=host.docker.internal \
  -e DB_USER=root \
  -e DB_PASSWORD="" \
  -e DB_NAME=react_node_app \
  book-author-api
```

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Node.js environment | `production` |
| `PORT` | Application port | `3200` |
| `DB_HOST` | MySQL host | `localhost` |
| `DB_PORT` | MySQL port | `3306` |
| `DB_USER` | MySQL username | `root` |
| `DB_PASSWORD` | MySQL password | *(empty)* |
| `DB_NAME` | Database name | `react_node_app` |

## 📋 Docker Commands

### Build Commands
```bash
# Build image
docker build -t book-author-api .

# Build with specific tag
docker build -t book-author-api:v1.0.0 .

# Build for production
docker build --target production -t book-author-api:prod .
```

### Run Commands
```bash
# Run container
docker run -d --name book-author-api -p 3200:3200 book-author-api

# Run with environment file
docker run -d --name book-author-api -p 3200:3200 --env-file .env book-author-api

# Run with volume for logs
docker run -d --name book-author-api -p 3200:3200 -v $(pwd)/logs:/app/logs book-author-api
```

### Management Commands
```bash
# View logs
docker logs book-author-api

# Follow logs
docker logs -f book-author-api

# Execute shell in container
docker exec -it book-author-api sh

# Stop container
docker stop book-author-api

# Remove container
docker rm book-author-api
```

### Docker Compose Commands
```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and start
docker-compose up -d --build

# Remove all data
docker-compose down -v
```

## 🏥 Health Checks

The Docker image includes a health check that verifies the `/health` endpoint:

```bash
# Check container health
docker ps

# View health check logs
docker inspect --format='{{json .State.Health}}' book-author-api
```

## 🔐 Security Features

- **Non-root user**: Application runs as `nodeuser` (UID 1001)
- **Alpine Linux**: Minimal base image for reduced attack surface
- **Signal handling**: Uses `dumb-init` for proper signal forwarding
- **Resource limits**: Memory and CPU limits in production compose file

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   ```bash
   # Check if MySQL is running
   docker-compose ps
   
   # Check database logs
   docker-compose logs mysql
   ```

2. **Port Already in Use**
   ```bash
   # Find process using port 3200
   lsof -i :3200
   
   # Use different port
   docker run -p 3201:3200 book-author-api
   ```

3. **Permission Issues**
   ```bash
   # Fix log directory permissions
   sudo chown -R 1001:1001 logs/
   ```

### Debug Mode

```bash
# Run container in debug mode
docker run -it --rm \
  -p 3200:3200 \
  -e NODE_ENV=development \
  book-author-api \
  sh
```

## 📊 Monitoring

### Container Stats
```bash
# View resource usage
docker stats book-author-api

# View all containers
docker stats
```

### Health Monitoring
```bash
# Continuous health check
watch -n 5 'curl -s http://localhost:3200/health'
```

## 🚀 Production Deployment

For production deployment:

1. Use `docker-compose.prod.yml`
2. Set strong passwords in `.env`
3. Configure reverse proxy (NGINX)
4. Set up log aggregation
5. Configure monitoring and alerts
6. Use Docker secrets for sensitive data

```bash
# Production deployment
cp .env.example .env
# Edit .env with production values
docker-compose -f docker-compose.prod.yml up -d
```

## 📚 References -->