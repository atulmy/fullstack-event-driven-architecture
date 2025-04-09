# base
FROM node:22-slim AS base
ARG ENV_NAME=production

# setup
FROM base AS setup
WORKDIR /source
COPY . .
RUN npx turbo prune @projects/app.console --docker

# builder
FROM base AS builder
WORKDIR /source
COPY --from=setup /source/out/json/ .
RUN npm install --loglevel=error --no-audit --no-fund --force
COPY --from=setup /source/out/full/ .
COPY --from=setup /source/out/full/projects/app/console/.env.${ENV_NAME} /source/projects/app/console/.env.production
RUN npx turbo build
RUN npm prune --production

# runner
FROM base AS runner
WORKDIR /source
RUN addgroup --system --gid 1001 source
RUN adduser --system --uid 1001 source
USER source
COPY --from=builder --chown=source:nodejs /source/node_modules /source/node_modules
COPY --from=builder --chown=source:nodejs /source/projects/app/console/package.json /source/package.json
COPY --from=builder --chown=source:nodejs /source/projects/app/console/.next /source/.next
EXPOSE 4002
ENTRYPOINT npm run start:prod
