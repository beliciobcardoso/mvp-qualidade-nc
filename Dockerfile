# Etapa 1: Construção

# Imagem base
FROM node:18-alpine AS builder

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos
COPY package.json package-look.json ./

# Instalar dependências
RUN npm install

# Copiar arquivos
COPY . .

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
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public

# Instalar dependências em produção
RUN npm install --only=production

# Comando de execução
CMD ["npm", "start"]