# Testes da Aplicação

**Legenda:**
- `[OK]` — Teste implementado e passando
- `[STUB]` — Arquivo de teste existe, mas sem implementação (vazio/stub)
- `[ ]` — Teste não existe, precisa ser criado
- `[—]` — Não se aplica (interface, módulo, etc.)

---

## 1. Unit Tests

### 1.1 Domain — Value Objects (`src/domain/value-objects/`)

| Arquivo | Tipo | Unit Test | Status |
|---|---|---|---|
| `documents.vo.ts` | Value Object | `test/modules/unit/domain/value-objects/documents.vo.spec.ts` | [ ] |
| `price.vo.ts` | Value Object | `test/modules/unit/domain/value-objects/price.vo.spec.ts` | [ ] |
| `symbol.vo.ts` | Value Object | `test/modules/unit/domain/value-objects/symbol.vo.spec.ts` | [ ] |
| `order-status.enum.ts` | Enum | `test/modules/unit/domain/value-objects/order-status.enum.spec.ts` | [ ] |
| `user-role.enum.ts` | Enum | `test/modules/unit/domain/value-objects/user-role.enum.spec.ts` | [ ] |
| `user-status.enum.ts` | Enum | `test/modules/unit/domain/value-objects/user-status.enum.spec.ts` | [ ] |

**O que testar:**
- `documents.vo.ts` — Criação de CPF, CNPJ, SSN, EIN, NIF; validação de formato; `DocumentFactory` por país
- `price.vo.ts` — Criação com valor positivo; erro com valor zero/negativo
- `symbol.vo.ts` — Formato válido (ex: PETR4, VALE3); formato inválido (ex: lower case, caracteres especiais)
- `order-status.enum.ts` — Valores existentes
- `user-role.enum.ts` — Valores existentes (CLIENT, SYS_ADMIN)
- `user-status.enum.ts` — Valores existentes (CREATED, ACTIVE, REQUEST_DEACTIVATE, DEACTIVATED)

---

### 1.2 Domain — Entities (`src/domain/entities/`)

| Arquivo | Tipo | Unit Test | Status |
|---|---|---|---|
| `base.entity.ts` | Base Entity | `test/modules/unit/domain/entities/base.entity.spec.ts` | [ ] |
| `asset.entity.ts` | Entity | `test/modules/unit/domain/entities/asset.entity.spec.ts` | [ ] |
| `oder.entity.ts` | Entity | `test/modules/unit/domain/entities/oder.entity.spec.ts` | [ ] |

**O que testar:**
- `base.entity.ts` — Criação com id único; getters de createdAt/updatedAt
- `asset.entity.ts` — Criação; associação com símbolo
- `oder.entity.ts` — Criação; validação de preço

---

### 1.3 Domain — Errors (`src/domain/domain-errors/`)

| Arquivo | Tipo | Unit Test | Status |
|---|---|---|---|
| `value-object.errors.ts` | Error Classes | `test/modules/unit/domain/domain-errors/value-object.errors.spec.ts` | [ ] |

**O que testar:**
- Instanciação de cada erro (`SymbolIsNotValidError`, `PriceIsNotValidError`, `DocumentIsNotValidError`)

---

### 1.4 Commons — Base Classes (`src/commons/`)

| Arquivo | Tipo | Unit Test | Status |
|---|---|---|---|
| `lib/aggregate.base.ts` | Base Class | `test/modules/unit/commons/lib/aggregate.base.spec.ts` | [ ] |
| `domain-events/domain-event.base.ts` | Base Class | `test/modules/unit/commons/domain-events/domain-event.base.spec.ts` | [ ] |
| `response/success.response.ts` | Response DTO | `test/modules/unit/commons/response/success.response.spec.ts` | [ ] |

**O que testar:**
- `aggregate.base.ts` — Gerenciamento de eventos (`addEvent`, `getEvents`, `cleanEvents`); datas de criação/atualização
- `domain-event.base.ts` — Criação de evento com nome, aggregateId, rawData; `getEventName()`
- `success.response.ts` — Formato da resposta

---

### 1.5 Commons — Decorators (`src/commons/decorators/`)

| Arquivo | Tipo | Unit Test | Status |
|---|---|---|---|
| `application/application.decorator.ts` | Decorator | `test/modules/unit/commons/decorators/application.decorator.spec.ts` | [ ] |
| `user-role/user-role.decorator.ts` | Decorator | `test/modules/unit/commons/decorators/user-role.decorator.spec.ts` | [ ] |
| `current-user/current-user.decorator.ts` | Decorator | `test/modules/unit/commons/decorators/current-user.decorator.spec.ts` | [ ] |

**O que testar:**
- `application.decorator.ts` — Prefixo da rota (`finance/api/v1/`); `ApiTags` adicionada
- `user-role.decorator.ts` — Metadata `user-role` definida corretamente
- `current-user.decorator.ts` — Extração de `req.user` do contexto

---

### 1.6 Commons — Middleware (`src/commons/middlewares/`)

| Arquivo | Tipo | Unit Test | Status |
|---|---|---|---|
| `api-token/api-token.middleware.ts` | Middleware | `test/modules/unit/commons/middlewares/api-token.middleware.spec.ts` | [OK]* |

> **`*`** — Teste existe mas **quebrado** (`req.header is not a function`). Precisa de correção.

---

### 1.7 Commons — Patterns (`src/commons/patterns/`)

| Arquivo | Tipo | Unit Test | Status |
|---|---|---|---|
| `consulting/consulting.pattern.ts` | Pattern | `test/modules/unit/commons/patterns/consulting.pattern.spec.ts` | [ ] |

---

### 1.8 Notification — Domain (`src/modules/notification/domain/`)

| Arquivo | Tipo | Unit Test | Status |
|---|---|---|---|
| `notification.aggregate.ts` | Aggregate | `test/modules/unit/notification/domain/notification.aggregate.spec.ts` | [ ] |

**O que testar:**
- `NotificationAggregate.create()` — Cria com UUID, readAt = null
- `NotificationAggregate.fromPersistence()` — Reconstrói a partir de dados do banco
- Getters (`getId`, `getUserId`, `getType`, `getTitle`, `getContent`, `getAggregateId`, `getReadAt`)
- `markAsRead()` — Define readAt
- `isRead()` — Retorna true/false
- `toJSON()` — Formato correto

---

### 1.9 Notification — Handlers (`src/modules/notification/handlers/`)

| Arquivo | Tipo | Unit Test | Status |
|---|---|---|---|
| `notification.handler.ts` | Event Handler | `test/modules/unit/notification/handlers/notification.handler.spec.ts` | [ ] |

**O que testar:**
- `handleUserCreated` — Cria notificação com tipo USER_CREATED; chama repository.save()
- `handleWalletCreated` — Cria notificação com tipo WALLET_CREATED; chama repository.save()
- `parseRawData` — Converte string JSON para objeto

---

### 1.10 Notification — Repository (`src/modules/notification/infra/repository/`)

| Arquivo | Tipo | Unit Test | Status |
|---|---|---|---|
| `notification.repositoryImpl.ts` | Repository Impl | `test/modules/unit/notification/infra/repository/notification.repositoryImpl.spec.ts` | [ ] |

**O que testar (com Prisma mockado):**
- `findByUnique` — Retorna aggregate quando encontrado; null quando não encontrado
- `findManyByEmail` — Retorna lista filtrada por email
- `findByUserId` — Retorna lista ordenada por createdAt desc
- `save` — Cria registro via Prisma; retorna aggregate
- `markAsRead` — Atualiza múltiplos registros
- `markOneAsRead` — Atualiza um registro com readAt
- `countUnreadByUserId` — Retorna contagem correta

---

### 1.11 Notification — Mapper (`src/modules/notification/infra/mapper/`)

| Arquivo | Tipo | Unit Test | Status |
|---|---|---|---|
| `notification.mapper.ts` | Mapper | `test/modules/unit/notification/infra/mapper/notification.mapper.spec.ts` | [OK] |

---

### 1.12 Notification — Use Cases (`src/modules/notification/use-cases/`)

| Arquivo | Tipo | Unit Test | Status |
|---|---|---|---|
| `findall.use-case.ts` | Use Case | `test/modules/unit/notification/use-cases/findall.use-case.spec.ts` | [ ] |
| `find-one-by-email.use-case.ts` | Use Case | `test/modules/unit/notification/use-cases/find-one-by-email.use-case.spec.ts` | [ ] |
| `mark-all-as-read.use-case.ts` | Use Case | `test/modules/unit/notification/use-cases/mark-all-as-read.use-case.spec.ts` | [ ] |
| `mark-one-as-read.use-case.ts` | Use Case | `test/modules/unit/notification/use-cases/mark-one-as-read.use-case.spec.ts` | [ ] |

**O que testar:**
- `findall.use-case.ts` — Retorna lista de notificações do usuário; lista vazia se não há
- `find-one-by-email.use-case.ts` — Busca por email; NotFoundException se não existe
- `mark-all-as-read.use-case.ts` — Marca todas como lidas
- `mark-one-as-read.use-case.ts` — Marca uma como lida; NotFoundException se não existe; validação de ownership

---

### 1.13 Notification — Controller (`src/modules/notification/`)

| Arquivo | Tipo | Unit Test | Status |
|---|---|---|---|
| `notification.controller.ts` | Controller | `test/modules/unit/notification/notification.controller.spec.ts` | [ ] |

**O que testar:**
- Cada rota chama o use case correspondente
- Parse correto de parâmetros (query, param, body)

---

### 1.14 Profile — Domain (`src/modules/profile/profile-users/domain/`)

| Arquivo | Tipo | Unit Test | Status |
|---|---|---|---|
| `user.aggregate.ts` | Aggregate | `test/modules/unit/profile/profile-users/domain/user.aggregate.spec.ts` | [ ] |
| `wallet.entity.ts` | Entity | `test/modules/unit/profile/profile-users/domain/wallet.entity.spec.ts` | [ ] |

**O que testar (UserAggregate):**
- `UserAggregate.create()` — Cria com status CREATED; emite UserCreatedEvent e WalletCreatedEvent
- `UserAggregate.fromPersistence()` — Reconstrói com wallet existente; cria wallet default se não existir
- Getters (`getId`, `getName`, `getEmail`, `getPassword`, `getDocument`, `getRole`, `getStatus`, `getWallet`)
- Setters (`setName`, `setEmail`, `setPassword`, `setDocument`)
- `update()` — Atualiza campos parciais
- `requestDeactivation()` — Muda status para REQUEST_DEACTIVATE
- `toJSON()` — Formato correto

**O que testar (WalletEntity):**
- `WalletEntity.create()` — Cria com saldo 0
- `WalletEntity.fromPersistence()` — Reconstrói com saldo e userId
- `credit(amount)` — Incrementa saldo
- `debit(amount)` — Decrementa saldo; erro se saldo insuficiente
- `toJSON()` — Formato correto

---

### 1.15 Profile — Integration Events (`src/modules/profile/profile-users/events/`)

| Arquivo | Tipo | Unit Test | Status |
|---|---|---|---|
| `user.integration-events.ts` | Event Classes | `test/modules/unit/profile/profile-users/events/user.integration-events.spec.ts` | [ ] |
| `user.domain-events.ts` | Event Classes | `test/modules/unit/profile/profile-users/events/user.domain-events.spec.ts` | [ ] |

**O que testar:**
- `UserCreatedEvent` — Nome do evento, aggregateId, rawData
- `WalletCreatedEvent` — Nome do evento, aggregateId, rawData

---

### 1.16 Profile — User Mapper (`src/modules/profile/profile-users/infra/mappers/`)

| Arquivo | Tipo | Unit Test | Status |
|---|---|---|---|
| `user.mapper.ts` | Mapper | `test/modules/unit/profile/profile-users/infra/mappers/user.mapper.spec.ts` | [OK] |

---

### 1.17 Profile — Repository Impl (`src/modules/profile/profile-users/infra/repositories/`)

| Arquivo | Tipo | Unit Test | Status |
|---|---|---|---|
| `user.repositoryImpl.prisma.ts` | Repository Impl | `test/modules/unit/profile/profile-users/infra/repositories/user.repositoryImpl.spec.ts` | [ ] |

**O que testar (com Prisma mockado):**
- `save` — Upsert com wallet; retorna aggregate
- `findById` — Retorna aggregate com wallet; null se não encontrado
- `findByEmail` — Busca por email único
- `findByDocument` — Busca por document único
- `update` — Atualização parcial de campos
- `remove` — Delete por id

---

### 1.18 Profile — Use Cases (`src/modules/profile/profile-users/use-case/`)

| Arquivo | Tipo | Unit Test | Status |
|---|---|---|---|
| `create.use-case.ts` | Use Case | `test/modules/unit/profile/profile-users/use-case/create.use-case.spec.ts` | [ ] |
| `update.use-case.ts` | Use Case | `test/modules/unit/profile/profile-users/use-case/update.use-case.spec.ts` | [ ] |
| `request-deactivation.use-case.ts` | Use Case | `test/modules/unit/profile/profile-users/use-case/request-deactivation.use-case.spec.ts` | [ ] |

> Nota: Arquivo fonte está nomeado como `reuqest-deactivate.ts` (typo). Renomear primeiro.

**O que testar:**
- `create.use-case.ts` — Cria usuário; retorna sucesso; BadRequestException se email duplicado
- `update.use-case.ts` — Atualiza campos; NotFoundException se não existe
- `request-deactivation.use-case.ts` — Muda status; NotFoundException se não existe

---

### 1.19 Profile — Pipe (`src/modules/profile/profile-users/pipes/`)

| Arquivo | Tipo | Unit Test | Status |
|---|---|---|---|
| `user-document.pipe.ts` | Pipe (Validation) | `test/modules/unit/profile/profile-users/pipes/user-document.pipe.spec.ts` | [ ] |

**O que testar:**
- Extração de `x-country-code` do header
- Validação de CPF (BR), CNPJ (BR), SSN (US), EIN (US), NIF (PT)
- Erro para documento inválido
- Default country = 'BR'

---

### 1.20 Profile — Guard (`src/modules/profile/commons/guards/`)

| Arquivo | Tipo | Unit Test | Status |
|---|---|---|---|
| `system-user.guards.ts` | Guard | `test/modules/unit/profile/commons/guards/system-user.guards.spec.ts` | [ ] |

---

### 1.21 IAM — Auth (`src/modules/IAM/`)

| Arquivo | Tipo | Unit Test | Status |
|---|---|---|---|
| `iam.module.ts` | Module | — | — |
| `auth/auth.controller.ts` | Controller | `test/modules/unit/IAM/auth/auth.controller.spec.ts` | [ ] |
| `strategies/jwt.strategy.ts` | Strategy | `test/modules/unit/IAM/strategies/jwt.strategy.spec.ts` | [ ] |
| `guards/roles.guard.ts` | Guard | `test/modules/unit/IAM/guards/roles.guard.spec.ts` | [ ] |
| `decorators/current-user.decorator.ts` | Decorator | `test/modules/unit/IAM/decorators/current-user.decorator.spec.ts` | [ ] |

---

### 1.22 IAM — Auth Service (`src/modules/IAM/auth/`)

| Arquivo | Tipo | Unit Test | Status |
|---|---|---|---|
| `auth.service.ts` | Service | `test/modules/unit/IAM/auth/auth.service.spec.ts` | [ ] |

**O que testar:**
- Sign-in com email e senha corretos → retorna JWT
- Sign-in com email incorreto → UnauthorizedException
- Sign-in com senha incorreta → UnauthorizedException

---

### 1.23 System — Assets (`src/modules/system/assets/`)

| Arquivo | Tipo | Unit Test | Status |
|---|---|---|---|
| `assets.controller.ts` | Controller | `test/modules/unit/system/assets/assets.controller.spec.ts` | [ ] |
| `assets.service.ts` | Service | `test/modules/unit/system/assets/assets.service.spec.ts` | [ ] |

**O que testar:**
- `assets.service.ts` — `findAll` retorna lista; `create` com símbolo duplicado lança erro
- `assets.controller.ts` — Cada rota chama o service correspondente

---

### 1.24 System — System Users (`src/modules/system/system-users/`)

| Arquivo | Tipo | Unit Test | Status |
|---|---|---|---|
| `system-user.controller.ts` | Controller | `test/modules/unit/system/system-users/system-user.controller.spec.ts` | [ ] |
| `domain/system-user.aggregate.ts` | Aggregate | `test/modules/unit/system/system-users/domain/system-user.aggregate.spec.ts` | [ ] |
| `events/system-users.events.ts` | Events | `test/modules/unit/system/system-users/events/system-users.events.spec.ts` | [ ] |
| `use-cases/create.use-case.ts` | Use Case | `test/modules/unit/system/system-users/use-cases/create.use-case.spec.ts` | [ ] |
| `use-cases/delete.use-case.ts` | Use Case | `test/modules/unit/system/system-users/use-cases/delete.use-case.spec.ts` | [ ] |
| `use-cases/findall.use-case.ts` | Use Case | `test/modules/unit/system/system-users/use-cases/findall.use-case.spec.ts` | [ ] |
| `use-cases/findone.use-case.ts` | Use Case | `test/modules/unit/system/system-users/use-cases/findone.use-case.spec.ts` | [ ] |
| `use-cases/update.use-case.ts` | Use Case | `test/modules/unit/system/system-users/use-cases/update.use-case.spec.ts` | [ ] |

---

### 1.25 System — Guard (`src/modules/system/common/guards/`)

| Arquivo | Tipo | Unit Test | Status |
|---|---|---|---|
| `system-guard.ts` | Guard | `test/modules/unit/system/common/guards/system-guard.spec.ts` | [ ] |

---

### 1.26 System — Decorator (`src/modules/system/common/system-decorators/`)

| Arquivo | Tipo | Unit Test | Status |
|---|---|---|---|
| `system-application.decorator.ts` | Decorator | `test/modules/unit/system/common/system-decorators/system-application.decorator.spec.ts` | [ ] |

---

### 1.27 Processing — Orders (`src/modules/processing/orders/`)

| Arquivo | Tipo | Unit Test | Status |
|---|---|---|---|
| `orders.controller.ts` | Controller | `test/modules/unit/processing/orders/orders.controller.spec.ts` | [ ] |
| `orders.service.ts` | Service | `test/modules/unit/processing/orders/orders.service.spec.ts` | [ ] |
| `dto/createOrder.dto.ts` | DTO | — (testado via controller) | — |
| `dto/updateOrder.dto.ts` | DTO | — | — |
| `enums/order-type.enum.ts` | Enum | `test/modules/unit/processing/orders/enums/order-type.enum.spec.ts` | [ ] |
| `enums/Satatus.enum.ts` | Enum | `test/modules/unit/processing/orders/enums/status.enum.spec.ts` | [ ] |

**O que testar:**
- `orders.service.ts` — `findAll` retorna lista; `create` com assetId inválido lança NotFoundException; cálculo de `totalPrice = quantity * price`
- `orders.controller.ts` — Cada rota chama o service

---

### 1.28 Shared — Event Broker (`src/modules/shared/event-broker/`)

| Arquivo | Tipo | Unit Test | Status |
|---|---|---|---|
| `event-bus.service.ts` | Service | `test/modules/unit/shared/event-broker/event-bus.service.spec.ts` | [ ] |
| `event-broker.processor.ts` | Processor | `test/modules/unit/shared/event-broker/event-broker.processor.spec.ts` | [ ] |

**O que testar:**
- `event-bus.service.ts` — `publish` adiciona jobs na fila do BullMQ
- `event-broker.processor.ts` — `process` emite evento via EventEmitter2; logging de sucesso/erro

---

### 1.29 Prisma (`src/modules/prisma/`)

| Arquivo | Tipo | Unit Test | Status |
|---|---|---|---|
| `prisma.service.ts` | Service | `test/modules/unit/prisma/prisma.service.spec.ts` | [ ] |

---

## 2. E2E Tests

### 2.1 App (`test/app.e2e-spec.ts`)

| Teste | Status |
|---|---|
| GET / → 200 + "Hello World!" | [OK] |

---

### 2.2 Assets (`test/modules/e2e/assets.controller.e2e-spec.ts`)

| Teste | Status |
|---|---|
| GET /assets → retorna array de ativos | [STUB] |
| POST /assets → cria novo ativo | [STUB] |
| POST /assets → BadRequestException se símbolo duplicado | [STUB] |
| PATCH /assets/:id/price → atualiza preço | [ ] |
| GET /assets/:id → retorna ativo específico | [ ] |

---

### 2.3 Orders (`test/modules/e2e/order.controller.e2e-spec.ts`)

| Teste | Status |
|---|---|
| GET /orders → retorna array de ordens | [ ] |
| POST /orders → cria nova ordem (com quantity, calcula totalPrice) | [ ] |
| POST /orders → NotFoundException se asset não existe | [ ] |
| POST /orders/:id/execute → executa ordem | [ ] |
| POST /orders/:id/cancel → cancela ordem PENDING | [ ] |

> **Nota:** Arquivo existe mas está completamente vazio. Implementar do zero.

---

### 2.4 Users (Profile) — `test/modules/e2e/profile/profile-users/`

| Teste | Status |
|---|---|
| POST /client/users → cria usuário com sucesso | [ ] |
| POST /client/users → BadRequestException se email duplicado | [ ] |
| POST /client/users → validação de documento (CPF, CNPJ, etc) | [ ] |
| PATCH /client/users/:id → atualiza usuário | [ ] |
| POST /client/users/:id/deactivation → solicita desativação | [ ] |

---

### 2.5 Notification — `test/modules/e2e/notification/`

| Teste | Status |
|---|---|
| GET /notification → lista notificações do usuário autenticado | [ ] |
| GET /notification/:id → busca notificação específica | [ ] |
| PATCH /notification/:id/read → marca uma como lida | [ ] |
| PATCH /notification/read-all → marca todas como lidas | [ ] |

---

### 2.6 Auth (IAM) — `test/modules/e2e/IAM/`

| Teste | Status |
|---|---|
| POST /auth/sign-in → retorna JWT com credenciais válidas | [ ] |
| POST /auth/sign-in → UnauthorizedException com email incorreto | [ ] |
| POST /auth/sign-in → UnauthorizedException com senha incorreta | [ ] |
| GET rota protegida → 200 com token válido | [ ] |
| GET rota protegida → 401 sem token | [ ] |
| GET rota protegida → 403 sem role adequada | [ ] |

---

## 3. Resumo Geral

### 3.1 Cobertura por Módulo

| Módulo | Source | Testados | Pendentes Unit | Pendentes E2E | Cobertura |
|---|---|---|---|---|---|
| domain | 10 | 0 | 8 | — | 0% |
| commons | 8 | 1* | 5 | — | 12.5% |
| notification | 13 | 1 | 8 | 4 | 7.7% |
| profile | 20 | 1 | 13 | 3 | 5% |
| IAM | 3 | 0 | 3 | 6 | 0% |
| system | 17 | 0 | 12 | 4 | 0% |
| processing | 7 | 0 | 5 | 4 | 0% |
| shared | 4 | 0 | 3 | — | 0% |
| transactions | 1 | 0 | 0 | — | 0% |
| prisma | 2 | 0 | 1 | — | 0% |
| **TOTAL** | **85** | **3** | **58** | **21** | **3.5%** |

> `*` — Middleware test existe mas quebrado (precisa correção).

### 3.2 Prioridade Sugerida

| Prioridade | O que testar | Motivo |
|---|---|---|
| 🔴 Alta | Value Objects (`price.vo`, `symbol.vo`, `documents.vo`), Aggregates (`user.aggregate`, `notification.aggregate`), Wallet (`wallet.entity`) | Núcleo do domínio — regras de negócio críticas |
| 🟡 Média | Use Cases, Services, Repositories | Fluxos completos de cada funcionalidade |
| 🟢 Baixa | Controllers, Decorators, Guards, Pipes | Testes de integração/camada HTTP |
| 🔵 Infra | Middleware (corrigir existente), Mappers (já testados) | Já parcialmente cobertos |

### 3.3 Arquivos Para Corrigir Antes de Testar

| Arquivo | Problema |
|---|---|
| `test/modules/unit/commons/middlewares/api-token.middleware.spec.ts` | Teste quebrado — mock não implementa `req.header()` |
| `src/modules/profile/profile-users/use-case/reuqest-deactivate.ts` | Typo no nome do arquivo (dificulta localização do test) |
| `src/modules/processing/orders/enums/Satatus.enum.ts` | Typo no nome do arquivo e da classe |
| `src/domain/entities/oder.entity.ts` | Typo no nome do arquivo |
| `src/modules/system/system-users/domain/system-user.aggregate.ts` | Classe nomeada `SustemUserAggregate` (typo) |
| `src/modules/system/common/system-decorators/system-application.decorator.ts` | Template literal quebrado |
| `src/modules/profile/profile-users/domain/repositorie/` | Diretório duplicado com typo |

---

## 4. Testes já Implementados (Referência)

| Arquivo de Teste | O que cobre | Status |
|---|---|---|
| `test/modules/unit/notification/infra/mapper/notification.mapper.spec.ts` | NotificationMapper (toAggregate, toPersistence, round-trip) | ✅ Passando |
| `test/modules/unit/profile/profile-users/infra/mappers/user.mapper.spec.ts` | UserMapper (toAggregate, toPersistence, round-trip) | ✅ Passando |
| `test/modules/unit/commons/middlewares/api-token.middleware.spec.ts` | ApiTokenMiddleware (4 casos) | ❌ Falhando |
| `test/modules/e2e/assets.controller.e2e-spec.ts` | AssetsController (3 stubs vazios) | ⏳ Stub |
| `test/modules/e2e/order.controller.e2e-spec.ts` | OrdersController | 📄 Vazio |
| `test/app.e2e-spec.ts` | App bootstrap | ✅ Passando |
