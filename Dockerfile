# Use Node.js 20 official image with Alpine for smaller size and security
FROM node:20-alpine

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

# Add health check with proper error handling
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD node -e "const http = require('http'); const req = http.get('http://localhost:3200/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1); }); req.on('error', () => { process.exit(1); }); req.setTimeout(8000, () => { req.destroy(); process.exit(1); });"

# Start the application
CMD ["npm", "start"]
