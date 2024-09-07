# 环境变量文件(对应打包项目的env目录下的文件)
ARG API_ENV="prod"
# 项目名称(对应打包项目的apps目录下的文件夹名称)
ARG PROJECT_NAME="kk-pages"

FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
ARG PROJECT_NAME
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY pnpm-workspace.yaml ./
COPY turbo.json ./
COPY packages ./packages
COPY internal ./internal
COPY apps/${PROJECT_NAME}/package.json apps/${PROJECT_NAME}/yarn.lock* apps/${PROJECT_NAME}/package-lock.json* apps/${PROJECT_NAME}/pnpm-lock.yaml* apps/${PROJECT_NAME}/tsconfig.json ./apps/${PROJECT_NAME}/
COPY .npmrc package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

WORKDIR /app/apps/${PROJECT_NAME}

# Rebuild the source code only when needed
FROM base AS builder
ARG PROJECT_NAME
ARG API_ENV
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY --from=deps /app/internal ./internal
COPY --from=deps /app/apps/${PROJECT_NAME} ./apps/${PROJECT_NAME}

COPY . .

RUN cp ./apps/${PROJECT_NAME}/env/.env.${API_ENV} ./apps/${PROJECT_NAME}/.env.local

RUN \
  if [ -f yarn.lock ]; then cd ./apps/${PROJECT_NAME} && yarn run build; \
  elif [ -f package-lock.json ]; then cd ./apps/${PROJECT_NAME} && npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && cd ./apps/${PROJECT_NAME} && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
ARG PROJECT_NAME
ENV PROJECT_NAME_ENV=${PROJECT_NAME}
WORKDIR /app

ENV NODE_ENV="production"
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nuxtjs

COPY --from=builder --chown=nuxtjs:nodejs /app/.npmrc ./.npmrc
COPY --from=builder --chown=nuxtjs:nodejs /app/apps/${PROJECT_NAME_ENV}/.output ./
COPY --from=builder --chown=nuxtjs:nodejs /app/apps/${PROJECT_NAME_ENV}/.env.local ./

RUN ls
RUN cd ./server && corepack enable pnpm && pnpm install

USER nuxtjs

EXPOSE 3000

CMD ["node", "./server/index.mjs"]