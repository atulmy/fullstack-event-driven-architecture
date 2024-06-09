# builder
FROM node:20-slim AS builder
ENV NODE_ENV=development
RUN mkdir -p /source
WORKDIR /source
COPY package*.json ./
COPY . ./
RUN npm pkg delete scripts.prepare
RUN npm install --loglevel=error --force -w @packages/common -w @packages/ui -w @projects/api.core -w @projects/app.console
ENV NODE_ENV=production
RUN ["npm", "run", "build", "-w", "@packages/common"]
RUN ["npm", "run", "build", "-w", "@packages/ui"]
RUN ["npm", "run", "build", "-w", "@projects/app.console"]

# server
FROM node:20-slim AS server
RUN mkdir -p /source
WORKDIR /source
ENV NODE_ENV=production
COPY --from=builder /source/package.json /source/package.json
COPY --from=builder /source/packages/common/package.json /source/packages/common/package.json
COPY --from=builder /source/packages/common/build /source/packages/common/build
COPY --from=builder /source/packages/ui/package.json /source/packages/ui/package.json
COPY --from=builder /source/packages/ui/build /source/packages/ui/build
COPY --from=builder /source/projects/app/console/package.json /source/projects/app/console/package.json
COPY --from=builder /source/projects/app/console/.env.production /source/projects/app/console/.env.production
COPY --from=builder /source/projects/app/console/.next /source/projects/app/console/.next
COPY --from=builder /source/node_modules /source/node_modules
EXPOSE 5001
ENTRYPOINT ["npm", "run", "start:prod", "-w", "@projects/app.console"]
