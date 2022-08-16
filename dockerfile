FROM node:lts-alpine

WORKDIR /app

ENV PORT=$port

COPY package.json ./
RUN npm install --only=production

COPY . .
USER node

EXPOSE $PORT

CMD ["npm", "start"] --bind 0.0.0.0:$PORT --preload
