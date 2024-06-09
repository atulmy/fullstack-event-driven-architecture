# builder
FROM node:20-slim AS builder
ENV NODE_ENV=development
RUN mkdir -p /source
WORKDIR /source
COPY package*.json ./
COPY . ./
RUN npm pkg delete scripts.prepare
RUN npm install --loglevel=error --force -w @packages/common -w @projects/api.stt
ENV NODE_ENV=production
RUN ["npm", "run", "build", "-w", "@packages/common"]
RUN ["npm", "run", "build", "-w", "@projects/api.stt"]

# server
FROM node:20-slim AS server
RUN mkdir -p /source
WORKDIR /source
ENV NODE_ENV=production
COPY --from=builder /source/package.json /source/package.json
COPY --from=builder /source/packages/common/package.json /source/packages/common/package.json
COPY --from=builder /source/packages/common/build /source/packages/common/build
COPY --from=builder /source/projects/api/stt/package.json /source/projects/api/stt/package.json
COPY --from=builder /source/projects/api/stt/.env.production /source/projects/api/stt/.env.production
COPY --from=builder /source/projects/api/stt/build /source/projects/api/stt/build
COPY --from=builder /source/projects/api/stt/storage /source/projects/api/stt/storage
COPY --from=builder /source/node_modules /source/node_modules
EXPOSE 3001
ENTRYPOINT ["npm", "run", "start:prod", "-w", "@projects/api.stt"]
