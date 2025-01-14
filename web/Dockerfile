FROM node:lts-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app

ENV VITE_API_URL=https://api.netify.tools

RUN npm run build

EXPOSE 4422
ENV PORT=4422

CMD ["node", "build/index.js"]