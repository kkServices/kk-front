# 环境变量文件(对应打包项目的env目录下的文件)
ARG API_ENV="prod"
# 项目名称(对应打包项目的apps目录下的文件夹名称)
ARG PROJECT_NAME="next-mobile"

FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
ARG PROJECT_NAME
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY pnpm-workspace.yaml ./
COPY packages ./packages
COPY tooling ./tooling
COPY apps/${PROJECT_NAME}/package.json apps/${PROJECT_NAME}/yarn.lock* apps/${PROJECT_NAME}/package-lock.json* apps/${PROJECT_NAME}/pnpm-lock.yaml* ./apps/${PROJECT_NAME}/
COPY .npmrc package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
ARG PROJECT_NAME
ARG API_ENV
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY --from=deps /app/tooling ./tooling
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

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/apps/${PROJECT_NAME_ENV}/public ./apps/${PROJECT_NAME_ENV}/.next/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/${PROJECT_NAME_ENV}/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/${PROJECT_NAME_ENV}/.next/static ./apps/${PROJECT_NAME_ENV}/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/${PROJECT_NAME_ENV}/.env.local ./apps/${PROJECT_NAME_ENV}/

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD HOSTNAME="0.0.0.0" node ./apps/${PROJECT_NAME_ENV}/server.js
