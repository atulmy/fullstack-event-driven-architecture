# base
FROM node:22-slim AS base
ARG ENV_NAME=production

# setup
FROM base AS setup
WORKDIR /source
COPY . .
RUN npx turbo prune @projects/site.web --docker

# builder
FROM base AS builder
WORKDIR /source
COPY --from=setup /source/out/json/ .
RUN npm install --loglevel=error --no-audit --no-fund --force
COPY --from=setup /source/out/full/ .
COPY --from=setup /source/out/full/projects/site/web/.env.${ENV_NAME} /source/projects/site/web/.env.production
RUN npx turbo build
RUN npm prune --production

# runner
FROM base AS runner
WORKDIR /source
RUN addgroup --system --gid 1001 source
RUN adduser --system --uid 1001 source
USER source
COPY --from=builder --chown=source:nodejs /source/node_modules /source/node_modules
COPY --from=builder --chown=source:nodejs /source/projects/site/web/package.json /source/package.json
COPY --from=builder --chown=source:nodejs /source/projects/site/web/.next /source/.next
EXPOSE 5001
ENTRYPOINT npm run start:prod
