# base
FROM node:22-slim AS base

# setup
FROM base AS setup
WORKDIR /source
COPY . .
RUN npx turbo prune @projects/api.core --docker

# builder
FROM base AS builder
WORKDIR /source
COPY --from=setup /source/out/json/ .
RUN npm install --loglevel=error --no-audit --no-fund --force
COPY --from=setup /source/out/full/ .
RUN npx turbo build
RUN npm prune --production

# runner
FROM base AS runner
WORKDIR /source
RUN addgroup --system --gid 1001 source
RUN adduser --system --uid 1001 source
USER source
COPY --from=builder --chown=source:nodejs /source/node_modules /source/node_modules
COPY --from=builder --chown=source:nodejs /source/package.json /source/package.json
COPY --from=builder --chown=source:nodejs /source/packages/common/package.json /source/packages/common/package.json
COPY --from=builder --chown=source:nodejs /source/packages/common/build /source/packages/common/build
COPY --from=builder --chown=source:nodejs /source/packages/model/package.json /source/packages/model/package.json
COPY --from=builder --chown=source:nodejs /source/packages/model/build /source/packages/model/build
COPY --from=builder --chown=source:nodejs /source/projects/api/core/package.json /source/projects/api/core/package.json
COPY --from=builder --chown=source:nodejs /source/projects/api/core/.env /source/projects/api/core/.env
COPY --from=builder --chown=source:nodejs /source/projects/api/core/build /source/projects/api/core/build
EXPOSE 3001
ENTRYPOINT npm run start:prod -w @projects/api.core
