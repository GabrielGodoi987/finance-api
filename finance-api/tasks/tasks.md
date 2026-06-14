# Tasks — Finance API

## 1. Fluxo de Profile (Usuários) — Prioridade: ALTA

### 1.1 Use Cases
- [x] `create.use-case.ts` — Criar usuário
- [ ] `update.use-case.ts` — Eventos de domínio ao atualizar (emitir `UserUpdatedEvent`)
- [ ] `request-deactivation.use-case.ts` — Renomear arquivo (`reuqest-deactivate.ts` → `request-deactivation.use-case.ts`) e emitir evento `UserDeactivationRequestedEvent`

### 1.2 Eventos de Domínio
- [ ] `user.domain-events.ts` — Implementar eventos de domínio:
  - `UserUpdatedEvent`
  - `UserDeactivationRequestedEvent`
  - `UserDeactivatedEvent`
- [ ] `user.integration-events.ts` — Verificar se `WalletCreatedEvent` está enviando `userId` correto (atualmente envia `aggregateId` como ID da wallet, mas `userId` precisa ser o ID do usuário)

### 1.3 Notification Handler — Consumo dos Eventos
- [ ] `handleUserCreated` — Já implementado. Verificar se `payload.aggregateId` está sendo corretamente usado como `userId` na notificação
- [ ] `handleUserUpdated` — Criar handler para `User.updated`
- [ ] `handleUserDeactivationRequested` — Criar handler para `User.deactivation-requested`
- [ ] `handleUserDeactivated` — Criar handler para `User.deactivated`

### 1.4 Duplicidade & Limpeza
- [ ] Remover diretório duplicado `src/modules/profile/profile-users/domain/repositorie/` (typo, conteúdo obsoleto)
- [ ] Verificar se `user.module.ts` importa o repositório do caminho correto

---

## 2. Fluxo de Notification — Prioridade: ALTA

### 2.1 Use Cases (4 arquivos vazios)
- [ x ] `find-one-by-email.use-case.ts` — Buscar notificações através do email do usuário
- [ x ] `findall.use-case.ts` — Listar notificações do usuário logado (com paginação)
- [ x ] `mark-one-as-read.use-case.ts` — Marcar uma notificação como lida
- [ x ] `mark-all-as-read.use-case.ts` — Marcar todas como lidas

### 2.2 Controller (`notification.controller.ts`)
- [ x ] `GET /` → `findAll()` — Listar notificações do usuário autenticado
- [ x ] `GET /:id` → `findOneById()` — Buscar notificação específica (ou renomear para `findOne`)
- [ x ] `PATCH /:id/read` → `markOneAsRead()` — Marcar uma como lida
- [ x ] `PATCH /read-all` → `markAllAsRead()` — Marcar todas como lidas
- [ x ] Adicionar decorators HTTP (`@Get`, `@Patch`, `@Param`, `@Body`, etc.)
- [ x ] Conectar com os use cases

### 2.3 Repository
- [x] Interface `notification.repository.ts` — Implementada
- [x] Implementação `notification.repositoryImpl.ts` — Implementada
- [ x ] Verificar se `notification.repositoryImpl.ts` usa `NotificationMapper` (atualmente chama `NotificationAggregate.fromPersistence()` e `toJSON()` diretamente)

### 2.4 DTOs
- [ x ] Criar `src/modules/notification/dto/` com:
  - `find-notifications.dto.ts` (query params: page, limit, unreadOnly)
  - `mark-read.dto.ts` (body com array de IDs ou confirmação)

---

## 3. Regras de Negócio (rules.md) — Prioridade: MÉDIA

### 3.1 Wallet
- [x] RN01 — Todo usuário possui uma carteira (implementado em `WalletEntity`)
- [x] RN02 — Saldo nunca negativo (validar em `debit()`)
- [x] RN03 — Carteira criada automaticamente (implementado em `UserAggregate.create()`)

### 3.2 Assets
- [x] RN04 — Ativo identificado por `symbol`
- [ ] RN05 — Validar `symbol` (apenas letras maiúsculas e números) — verificar se `SymbolVO` já valida
- [x] RN06 — Preço atualizado via `PATCH /assets/:id/price`

### 3.3 Orders
- [ ] RN07 — Ordem pertence a um usuário e um ativo (verificar `CreateOrderDto` — atualmente não valida existência do usuário)
- [x] RN08 — Tipos: `BUY` e `SELL`
- [ ] RN09 — Status: `PENDING`, `EXECUTED`, `CANCELED`, `REJECTED` (verificar se `StatusEnum` cobre todos)
- [ ] RN10 — Ordem criada apenas como `PENDING` (atualmente `CreateOrderDto` permite passar status)
- [ ] RN11 — `totalPrice = quantity * price` calculado automaticamente (atualmente recebido do body)
- [ ] RN12 — Cancelamento de ordem `PENDING` pelo dono
- [ ] RN13 — Ordem `EXECUTED`/`CANCELED` não pode mudar de status
- [ ] RN14 — Validação de saldo/quantidade ao criar ordem
- [ ] RN15 — Bloqueio de saldo em ordem BUY `PENDING`

### 3.4 Holdings / Portfólio
- [ ] RN16 — Portfólio composto por holdings (modelo Prisma + módulo)
- [ ] RN17 — Holding criada na primeira compra
- [ ] RN18 — Quantidade nunca negativa
- [ ] RN19 — Execução BUY: incrementa holding, deduz saldo
- [ ] RN20 — Execução SELL: decrementa holding, credita saldo

### 3.5 Execução de Ordens
- [ ] RN21 — Endpoint `POST /orders/:id/execute`
- [ ] RN22 — Revalidação de saldo/quantidade no momento da execução

### 3.6 Histórico de Transações
- [ ] RN23 — Registro imutável de transações (modelo Prisma + módulo)
- [ ] RN24 — Transações apenas consultáveis (sem update/delete)

---

## 4. Módulos Vazios / Incompletos — Prioridade: MÉDIA

### 4.1 System
- [ ] `system.module.ts` — Importar `SystemUsersModule`, `AssetsModule`
- [ ] `system-users/` — Implementar use cases vazios (`create`, `update`, `delete`, `findall`, `findone`)
- [ ] `system-user.controller.ts` — Adicionar decorators HTTP e rotas
- [ ] `system-guard.ts` — Implementar guard (atualmente vazio)
- [ ] Corrigir `system-application.decorator.ts` — Template literal quebrado

### 4.2 Processing / Orders
- [ ] Refatorar `orders.service.ts` para usar DDD (Use Cases, Aggregate, Repository)
- [ ] Corrigir typos: `Satatus.enum.ts` → `status.enum.ts`
- [ ] Implementar validações de negócio (RN07–RN15)
- [ ] Endpoint `POST /orders/:id/execute` (RN21)

### 4.3 Profile
- [ ] `holding.module.ts` — Módulo de holdings (vazio)
- [ ] `wallet.module.ts` — Módulo de wallet (vazio)
- [ ] `system-user.guards.ts` — Implementar guard (atualmente só retorna `true`)

### 4.4 IAM — Autenticação JWT (Prioridade: ALTA)

**Dependências p/ instalar:** `@nestjs/jwt`, `@nestjs/passport`, `passport`, `passport-jwt`, `@types/passport-jwt`

**`.env`:** adicionar `JWT_SECRET` e `JWT_EXPIRATION`

**Estrutura:**
```
src/modules/IAM/
├── iam.module.ts              ← importa JwtModule, providers
├── auth/
│   ├── auth.controller.ts     ← POST /auth/sign-in
│   ├── auth.service.ts        ← valida credenciais, gera JWT
│   └── dto/
│       └── sign-in.dto.ts
├── strategies/
│   └── jwt.strategy.ts        ← extrai sub/email/name/role → req.user
├── guards/
│   └── roles.guard.ts         ← lê @UserRoleDecorator
└── decorators/
    └── current-user.decorator.ts  ← @CurrentUser()
```

**Fluxo:**
```
POST /auth/sign-in { email, password }
  → AuthService: findByEmail → bcrypt.compare → JWT { sub, email, name, role }
  → Response: { access_token }

Rotas protegidas → AuthGuard('jwt') → JwtStrategy.validate() → req.user
Controller → @CurrentUser() user → useCase.execute({ userId: user.userId })
```

**O que tocar:**
- [ ] Instalar dependências
- [ ] Adicionar `JWT_SECRET` + `JWT_EXPIRATION` no `.env`
- [ ] `iam.module.ts` — registrar `JwtModule`, `JwtStrategy`, `AuthService`, `AuthController`, `RolesGuard`
- [ ] `jwt.strategy.ts` — implementar `validate(payload)` → `{ userId, email, name, role }`
- [ ] `auth.controller.ts` — `POST /auth/sign-in`
- [ ] `auth.service.ts` — validar email+password, gerar JWT via `JwtService`
- [ ] `sign-in.dto.ts` — `@ApiProperty` + `@IsEmail()`, `@IsString()`
- [ ] `current-user.decorator.ts` — `createParamDecorator` extraindo `req.user`
- [ ] `roles.guard.ts` — check do `@UserRoleDecorator` vs `req.user.role`
- [ ] `create.use-case.ts` — adicionar `bcrypt.hash(password, 10)` antes de criar aggregate
- [ ] `app.module.ts` — importar `IAMModule`

### 4.5 Transactions
- [ ] `transactions.module.ts` — Módulo de histórico de transações (vazio)

---

## 5. Testes — Prioridade: MÉDIA

### 5.1 Unit Tests
- [x] `user.mapper.spec.ts`
- [x] `notification.mapper.spec.ts`
- [ ] `api-token.middleware.spec.ts` — Corrigir falha (`req.header is not a function`)
- [ ] `create.use-case.spec.ts` — Testar criação de usuário
- [ ] `notification.use-cases.spec.ts` — Testar use cases de notification
- [ ] `wallet.entity.spec.ts` — Testar crédito/débito
- [ ] `notification.aggregate.spec.ts` — Testar criação e markAsRead

### 5.2 E2E Tests
- [ ] `assets.controller.e2e-spec.ts` — Implementar testes reais
- [ ] `user.controller.e2e-spec.ts` — Criar e implementar
- [ ] `notification.controller.e2e-spec.ts` — Criar e implementar
- [ ] `order.controller.e2e-spec.ts` — Implementar testes reais

---

## 6. Limpeza e Refatoração — Prioridade: BAIXA

### 6.1 Typos
- [ x ] `reuqest-deactivate.ts` → `request-deactivation.use-case.ts`
- [ x ] `oder.entity.ts` → `order.entity.ts`
- [ x ] `Satatus.enum.ts` → `status.enum.ts`
- [ x ] `CreationgFailedEvent` → `CreationFailedEvent`
- [ x ] `SustemUserAggregate` → `SystemUserAggregate`
- [ x ] `repositorie/` → remover diretório duplicado

### 6.2 Arquivos de Domínio Duplicados
- [ ] `src/domain/entities/` contém `asset.entity.ts` e `oder.entity.ts` — verificar se são usados ou se devem ser removidos (módulo `system/assets` usa PrismaService diretamente)
- [ ] `src/domain/value-objects/` — verificar se estão sendo importados corretamente

---

## Legenda
- `[x]` — Implementado
- `[ ]` — Pendente
