<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Finance API (Assets & Orders)

API para gerenciamento de **assets** (ativos) e **orders** (ordens) construída com **Nest.js** e **PostgreSQL** via Prisma ORM, containerizada com Docker.

> ⚠️ **Refatoração em andamento** — Este projeto está sendo reestruturado com novos conhecimentos e boas práticas, migrando de MongoDB para **PostgreSQL**.

---

## Estrutura do Projeto

```
finance-api/
├── .docker/mongodb/          # (legado) a ser removido
├── prisma/
│   ├── schema.prisma         # Schema do banco PostgreSQL
│   └── prisma.config.ts
├── src/
│   ├── main.ts               # Entry point da aplicação
│   ├── domain/entities/      # Entidades de domínio (legado)
│   └── modules/
│       ├── app.module.ts
│       ├── assets/           # Módulo de ativos
│       │   ├── assets.controller.ts
│       │   ├── assets.service.ts
│       │   ├── assets.module.ts
│       │   └── dto/
│       ├── orders/           # Módulo de ordens
│       │   ├── orders.controller.ts
│       │   ├── orders.service.ts
│       │   ├── orders.module.ts
│       │   ├── dto/
│       │   └── enums/
│       └── prisma/           # Módulo Prisma (global)
│           ├── prisma.module.ts
│           └── prisma.service.ts
├── test/                     # Testes e2e
├── docker-compose.yml        # PostgreSQL + app
├── docker-compose.test.yaml
├── Dockerfile
└── package.json
```

---

## Endpoints

| Método | Rota       | Descrição            |
|--------|------------|----------------------|
| GET    | `/assets`  | Lista todos ativos   |
| POST   | `/assets`  | Cria um novo ativo   |
| GET    | `/orders`  | Lista todas ordens   |
| POST   | `/orders`  | Cria uma nova ordem  |

---

## Tecnologias

- **Nest.js 10** — Framework backend
- **PostgreSQL** — Banco de dados relacional
- **Prisma ORM** — Camada de acesso a dados
- **Docker** — Containerização
- **Jest** — Testes unitários e e2e

---

## Comandos

### Instalar dependências

```bash
npm install
```

### Configurar variáveis de ambiente

Copie o arquivo de exemplo e ajuste a `DATABASE_URL` se necessário:

```bash
cp .env.example .env
```

### Subir os containers (PostgreSQL + aplicação)

```bash
docker compose up -d
```

### Aplicar as migrations do Prisma

```bash
npx prisma migrate dev --name init
```

### Iniciar a aplicação em modo desenvolvimento

```bash
npm run start:dev
```

### Rodar testes

```bash
npm test           # testes unitários
npm run test:e2e   # testes e2e
```

### Outros comandos úteis

```bash
npm run build              # compilar o projeto
npm run lint               # lint + fix
npm run format             # formatar código com Prettier
npx prisma studio          # abrir interface gráfica do banco
docker compose exec -it financeapi bash  # entrar no container
```
