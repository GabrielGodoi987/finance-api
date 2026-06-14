# Sprint 4 — Notificações

**Período:** 1 semana
**Prioridade:** 🟡 Alta
**Dependências:** Sprint 3 (eventos de domínio concluídos)

---

## 📋 Resumo

Completar o módulo de notificações: implementar use cases pendentes, ajustar controller e garantir que todos os handlers estejam funcionando.

---

## 🎯 Features

### F01 — Use Cases de Notificação

**Descrição:** Implementar os 4 use cases do módulo de notificação.

**Requisitos:**

| ID | Requisito | Use Case |
|---|---|---|
| F01-R01 | `findall.use-case.ts` — listar notificações do usuário autenticado com paginação | `findAll(userId, page, limit, unreadOnly?)` |
| F01-R02 | `find-one-by-email.use-case.ts` — buscar notificações pelo email do usuário | `execute(email)` → NotFoundException se não existir |
| F01-R03 | `mark-one-as-read.use-case.ts` — marcar uma notificação como lida | `execute(notificationId, userId)` — valida ownership |
| F01-R04 | `mark-all-as-read.use-case.ts` — marcar todas como lidas | `execute(userId)` |

**Critérios de aceite:**
- [ ] GET `/notification` retorna lista paginada correta
- [ ] PATCH `/notification/:id/read` marca como lida
- [ ] PATCH `/notification/read-all` marca todas como lidas
- [ ] Erro 404 se notificação não existe
- [ ] Erro 403 se não pertence ao usuário

---

### F02 — Notification Controller (Ajustes)

**Descrição:** Garantir que todas as rotas do controller estejam conectadas aos use cases.

**Requisitos:**

| ID | Requisito |
|---|---|
| F02-R01 | `GET /notification` → `findAll()` |
| F02-R02 | `GET /notification/:id` → `findOneById()` |
| F02-R03 | `PATCH /notification/:id/read` → `markOneAsRead()` |
| F02-R04 | `PATCH /notification/read-all` → `markAllAsRead()` |
| F02-R05 | Adicionar decorators HTTP (`@Get`, `@Patch`, `@Param`, `@Body`, `@Query`) |
| F02-R06 | Usar `@CurrentUser()` para obter usuário autenticado |

**Critérios de aceite:**
- [ ] Todas as rotas retornam resposta correta

---

### F03 — Repository (Verificação)

**Descrição:** Garantir que `notification.repositoryImpl.ts` use o `NotificationMapper` corretamente.

**Requisitos:**

| ID | Requisito |
|---|---|
| F03-R01 | Substituir chamadas diretas a `NotificationAggregate.fromPersistence()` e `toJSON()` pelo mapper |

**Critérios de aceite:**
- [ ] Repository usa mapper de forma consistente

---

### F04 — Handlers de Eventos

**Descrição:** Garantir que todos os event handlers estejam registrados e processando eventos.

**Requisitos:**

| ID | Requisito |
|---|---|
| F04-R01 | `handleUserCreated` — verificar se `payload.aggregateId` é usado como `userId` |
| F04-R02 | `handleWalletCreated` — notificação `WALLET_CREATED` |
| F04-R03 | Registrar todos os handlers no `NotificationModule` |

**Critérios de aceite:**
- [ ] Eventos de domínio disparam notificações corretas
