# Use Node.js 20 official image with Alpine for smaller size and security
FROM node:20-alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Create app directory and set proper permissions
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Copy application code and set ownership
COPY --chown=nodejs:nodejs . .

# Create logs directory with proper permissions
RUN mkdir -p logs && chown -R nodejs:nodejs logs

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3200

# Add health check with proper error handling and better timing
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:3200/health || exit 1

# Start the application
CMD ["npm", "start"]
