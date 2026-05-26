FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY dist/apps/backend ./dist

EXPOSE 3000
CMD ["node", "dist/main"]