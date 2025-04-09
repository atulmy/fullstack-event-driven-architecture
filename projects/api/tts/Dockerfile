# base
FROM node:22-slim AS base

# setup
FROM base AS setup
WORKDIR /source
COPY . .
RUN npx turbo prune @projects/api.tts --docker

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
COPY --from=builder --chown=source:nodejs /source/projects/api/tts/package.json /source/projects/api/tts/package.json
COPY --from=builder --chown=source:nodejs /source/projects/api/tts/.env /source/projects/api/tts/.env
COPY --from=builder --chown=source:nodejs /source/projects/api/tts/build /source/projects/api/tts/build
EXPOSE 3003
ENTRYPOINT npm run start:prod -w @projects/api.tts
