FROM node:24-bookworm-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_DEMO_ENDPOINT
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_PUBLIC_DEMO_ENDPOINT=${NEXT_PUBLIC_DEMO_ENDPOINT}

RUN npm run build

FROM node:24-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/out ./out
COPY --from=builder /app/scripts/serve.mjs ./scripts/serve.mjs

EXPOSE 3000

CMD ["node", "scripts/serve.mjs"]
