FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY next.config.js ./
COPY tailwind.config.js ./
COPY tsconfig.json ./

RUN npm ci --only=production --silent

COPY src ./src/
COPY public ./public/

RUN mkdir -p .next/

RUN npm run build

EXPOSE 3000

USER node

CMD ["npm", "run", "dev"]