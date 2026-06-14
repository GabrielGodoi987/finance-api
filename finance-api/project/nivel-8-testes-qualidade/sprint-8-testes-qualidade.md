# Sprint 8 — Testes & Qualidade

**Período:** 2 semanas
**Prioridade:** 🟡 Alta
**Dependências:** Sprints 1–7 (código fonte completo)

---

## 📋 Resumo

Implementar bateria completa de testes unitários e E2E, corrigir testes quebrados e garantir cobertura mínima de 80%.

---

## 🎯 Features

### F01 — Corrigir Teste Quebrado do Middleware

**Descrição:** Arrumar `api-token.middleware.spec.ts` que falha com `req.header is not a function`.

**Requisitos:**

| ID | Requisito |
|---|---|
| F01-R01 | Criar mock correto de `Request` que implementa `header()` |
| F01-R02 | Garantir que os 4 casos de teste passem |

**Critérios de aceite:**
- [ ] `npm run test:unit` passa no middleware

---

### F02 — Unit Tests — Domain (Value Objects)

**Descrição:** Testar value objects do domínio.

**Requisitos:**

| ID | Requisito | Arquivo de Teste |
|---|---|---|
| F02-R01 | Testar `documents.vo.ts` — CPF, CNPJ, SSN, EIN, NIF | `test/modules/unit/domain/value-objects/documents.vo.spec.ts` |
| F02-R02 | Testar `price.vo.ts` — valor positivo, erro com zero/negativo | `test/modules/unit/domain/value-objects/price.vo.spec.ts` |
| F02-R03 | Testar `symbol.vo.ts` — formato válido/inválido | `test/modules/unit/domain/value-objects/symbol.vo.spec.ts` |
| F02-R04 | Testar enums (order-status, user-role, user-status) | respectivos spec.ts |

**Critérios de aceite:**
- [ ] 100% dos value objects testados

---

### F03 — Unit Tests — Domain (Entities & Errors)

**Descrição:** Testar entidades de domínio e classes de erro.

**Requisitos:**

| ID | Requisito |
|---|---|
| F03-R01 | `base.entity.spec.ts` — criação com UUID, getters |
| F03-R02 | `asset.entity.spec.ts` — criação, associação com símbolo |
| F03-R03 | `oder.entity.spec.ts` — criação, validação de preço |
| F03-R04 | `value-object.errors.spec.ts` — instanciação de cada erro |

**Critérios de aceite:**
- [ ] Todas as entidades testadas

---

### F04 — Unit Tests — Commons (Base Classes, Decorators, Patterns)

**Descrição:** Testar classes base, decorators e patterns.

**Requisitos:**

| ID | Requisito |
|---|---|
| F04-R01 | `aggregate.base.spec.ts` — gerenciamento de eventos |
| F04-R02 | `domain-event.base.spec.ts` — criação de evento |
| F04-R03 | `success.response.spec.ts` — formato da resposta |
| F04-R04 | Decorators: `application.decorator`, `user-role.decorator`, `current-user.decorator` |
| F04-R05 | `consulting.pattern.spec.ts` — pattern de consulta |

**Critérios de aceite:**
- [ ] Todos os testes de commons passam

---

### F05 — Unit Tests — Profile

**Descrição:** Testar módulo de profile (aggregate, wallet, use cases, repository, events).

**Requisitos:**

| ID | Requisito |
|---|---|
| F05-R01 | `user.aggregate.spec.ts` — criação, setters, update, deactivation, eventos |
| F05-R02 | `wallet.entity.spec.ts` — crédito/débito, saldo insuficiente |
| F05-R03 | `create.use-case.spec.ts` — criação, email duplicado |
| F05-R04 | `update.use-case.spec.ts` — atualização, NotFoundException |
| F05-R05 | `request-deactivation.use-case.spec.ts` — deactivation request |
| F05-R06 | `user.repositoryImpl.spec.ts` — persistência com Prisma mockado |
| F05-R07 | `user.integration-events.spec.ts` — eventos de integração |
| F05-R08 | `user-document.pipe.spec.ts` — pipe de validação de documento |
| F05-R09 | `system-user.guards.spec.ts` — guard |

**Critérios de aceite:**
- [ ] Módulo Profile com cobertura > 80%

---

### F06 — Unit Tests — Notification

**Descrição:** Testar módulo de notificações.

**Requisitos:**

| ID | Requisito |
|---|---|
| F06-R01 | `notification.aggregate.spec.ts` — criação, markAsRead, isRead, toJSON |
| F06-R02 | `notification.repositoryImpl.spec.ts` — CRUD com Prisma mockado |
| F06-R03 | Use cases: `findall`, `find-one-by-email`, `mark-all-as-read`, `mark-one-as-read` |
| F06-R04 | `notification.handler.spec.ts` — handlers de evento |
| F06-R05 | `notification.controller.spec.ts` — rotas chamam use cases |

**Critérios de aceite:**
- [ ] Módulo Notification com cobertura > 80%

---

### F07 — Unit Tests — IAM

**Descrição:** Testar módulo de autenticação.

**Requisitos:**

| ID | Requisito |
|---|---|
| F07-R01 | `auth.service.spec.ts` — sign-in válido/inválido, UnauthorizedException |
| F07-R02 | `auth.controller.spec.ts` — rota chama service |
| F07-R03 | `jwt.strategy.spec.ts` — validate retorna payload correto |
| F07-R04 | `roles.guard.spec.ts` — role matching |

**Critérios de aceite:**
- [ ] Módulo IAM com cobertura > 80%

---

### F08 — Unit Tests — System

**Descrição:** Testar módulo de sistema.

**Requisitos:**

| ID | Requisito |
|---|---|
| F08-R01 | `system-user.aggregate.spec.ts` — aggregate de usuário do sistema |
| F08-R02 | `system-user.controller.spec.ts` — rotas |
| F08-R03 | Use cases: `create`, `delete`, `findall`, `findone`, `update` |
| F08-R04 | `system-guard.spec.ts` — guard de sistema |
| F08-R05 | `assets.controller.spec.ts` e `assets.service.spec.ts` — CRUD ativos |

**Critérios de aceite:**
- [ ] Módulo System com cobertura > 80%

---

### F09 — Unit Tests — Processing / Orders

**Descrição:** Testar módulo de ordens (após refatoração DDD).

**Requisitos:**

| ID | Requisito |
|---|---|
| F09-R01 | `orders.service.spec.ts` — findAll, create com totalPrice, asset inválido |
| F09-R02 | `orders.controller.spec.ts` — rotas |
| F09-R03 | Enums: `order-type.enum.spec.ts`, `status.enum.spec.ts` |

**Critérios de aceite:**
- [ ] Módulo Processing com cobertura > 80%

---

### F10 — Unit Tests — Shared / Prisma

**Descrição:** Testar módulos compartilhados.

**Requisitos:**

| ID | Requisito |
|---|---|
| F10-R01 | `event-bus.service.spec.ts` — publish adiciona jobs no BullMQ |
| F10-R02 | `event-broker.processor.spec.ts` — process emite evento via EventEmitter2 |
| F10-R03 | `prisma.service.spec.ts` — inicialização |

**Critérios de aceite:**
- [ ] Módulos shared testados

---

### F11 — Testes E2E

**Descrição:** Implementar testes end-to-end para todos os módulos.

**Requisitos:**

| ID | Módulo | Testes |
|---|---|---|
| F11-R01 | Auth | Sign-in (sucesso, email inválido, senha inválida), rota protegida sem token, sem role |
| F11-R02 | Assets | GET lista, POST cria, POST duplicado, PATCH price, GET by id |
| F11-R03 | Orders | GET lista, POST com validação, POST /:id/execute, POST /:id/cancel |
| F11-R04 | Profile | POST cria, POST email duplicado, PATCH atualiza, POST deactivation |
| F11-R05 | Notification | GET lista, GET by id, PATCH read, PATCH read-all |
| F11-R06 | System Users | CRUD completo com autenticação SYS_ADMIN |

**Critérios de aceite:**
- [ ] Todos os E2E tests passam
- [ ] Cobertura global > 70%
