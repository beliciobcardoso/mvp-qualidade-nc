# Etapa 1: Construção

# Imagem base
FROM node:18-alpine AS builder

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos
COPY package.json ./

# Instalar dependências
RUN npm install

# Copiar arquivos
COPY . .

# executar prisma generate
RUN npx prisma generate

# Construir aplicação
RUN npm run build

# remover dependências de desenvolvimento
RUN npm prune --production

# Etapa 2: Execução

# Imagem base
FROM node:18-alpine

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
# COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/assets ./assets
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/components ./components
COPY --from=builder /app/config ./config
COPY --from=builder /app/hooks ./hooks
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/service ./service
COPY --from=builder /app/types ./types
COPY --from=builder /app/.env ./
COPY --from=builder /app/middleware.ts ./
COPY --from=builder /app/postcss.config.mjs ./
COPY --from=builder /app/tailwind.config.ts ./
COPY --from=builder /app/tsconfig.json ./

# Instalar dependências em produção
RUN npm install --only=production

# Variáveis de ambiente
ENV NODE_ENV=production

# executar prisma generate
RUN npx prisma generate

# Porta de execução
EXPOSE 8088

# Comando de execução
CMD ["npm", "start"]