# syntax=docker/dockerfile:1
# Base image pinned by digest (resolved 2026-10-14). Let Dependabot's "docker" ecosystem keep it current.
FROM node:25-slim@sha256:81db02c4b671288a03915da9534dbd54f96d0e7c24d80ccc54f5b36b2e684370

ENV NODE_ENV=production \
    PORT=3000
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY server.ts ./

# The official Node.js images include an unprivileged "node" user with UID and GID 1000.
USER 1000:1000
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:3000/health').then((r) => process.exit(r.ok ? 0 : 1), () => process.exit(1))"]

# Exec form so SIGTERM reaches Node.js directly and the server shuts down gracefully.
CMD ["node", "server.ts"]
