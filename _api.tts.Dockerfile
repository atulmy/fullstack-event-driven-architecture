# builder
FROM node:20-slim AS builder
ENV NODE_ENV=development
RUN mkdir -p /source
WORKDIR /source
COPY package*.json ./
COPY . ./
RUN npm pkg delete scripts.prepare
RUN npm install --loglevel=error --force -w @packages/common -w @packages/model -w @projects/api.tts
ENV NODE_ENV=production
RUN ["npm", "run", "build", "-w", "@packages/common"]
RUN ["npm", "run", "build", "-w", "@packages/model"]
RUN ["npm", "run", "build", "-w", "@projects/api.tts"]

# server
FROM node:20-slim AS server
RUN mkdir -p /source
WORKDIR /source
ENV NODE_ENV=production
COPY --from=builder /source/package.json /source/package.json
COPY --from=builder /source/packages/common/package.json /source/packages/common/package.json
COPY --from=builder /source/packages/common/build /source/packages/common/build
COPY --from=builder /source/packages/model/package.json /source/packages/model/package.json
COPY --from=builder /source/packages/model/build /source/packages/model/build
COPY --from=builder /source/projects/api/tts/package.json /source/projects/api/tts/package.json
COPY --from=builder /source/projects/api/tts/.env.production /source/projects/api/tts/.env.production
COPY --from=builder /source/projects/api/tts/build /source/projects/api/tts/build
COPY --from=builder /source/projects/api/tts/storage /source/projects/api/tts/storage
COPY --from=builder /source/node_modules /source/node_modules
EXPOSE 3001
ENTRYPOINT ["npm", "run", "start:prod", "-w", "@projects/api.tts"]
