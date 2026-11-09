FROM node:24-alpine
WORKDIR /app
COPY server/package.json server/package-lock.json ./server/
RUN npm ci --omit=dev --ignore-scripts --prefix server
COPY . .
ENV PORT=8787
EXPOSE 8787
USER node
CMD ["node", "server/server.mjs"]
