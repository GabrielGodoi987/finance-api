# Sprint 3 — Profile & Usuários

**Período:** 1–2 semanas
**Prioridade:** 🔴 Crítica
**Dependências:** Sprint 2 (autenticação concluída)

---

## 📋 Resumo

Completar o módulo de usuários (Profile): implementar use cases pendentes, eventos de domínio, handlers de notificação e corrigir integrações.

---

## 🎯 Features

### F01 — Update Use Case (completar)

**Descrição:** Implementar lógica de atualização de usuário com emissão de eventos de domínio.

**Requisitos:**

| ID | Requisito |
|---|---|
| F01-R01 | `execute(id, data)` — atualiza campos parciais (name, email, document, password) |
| F01-R02 | Emitir `UserUpdatedEvent` após atualizar |
| F01-R03 | `NotFoundException` se usuário não existir |

**Critérios de aceite:**
- [ ] PATCH `/client/users/:id` atualiza e emite evento

---

### F02 — Request Deactivation Use Case

**Descrição:** Permitir que usuário solicite desativação da conta.

**Requisitos:**

| ID | Requisito |
|---|---|
| F02-R01 | `execute(id)` — muda status para `REQUEST_DEACTIVATE` |
| F02-R02 | Emitir `UserDeactivationRequestedEvent` |
| F02-R03 | Renomear `reuqest-deactivate.ts` → `request-deactivation.use-case.ts` |

**Critérios de aceite:**
- [ ] POST `/client/users/:id/deactivation` solicita desativação
- [ ] Evento é emitido corretamente

---

### F03 — Eventos de Domínio do Usuário

**Descrição:** Implementar `user.domain-events.ts` com todos os eventos do aggregate User.

**Requisitos:**

| ID | Requisito |
|---|---|
| F03-R01 | `UserUpdatedEvent` — nome = `User.updated`, rawData com campos alterados |
| F03-R02 | `UserDeactivationRequestedEvent` — nome = `User.deactivation-requested` |
| F03-R03 | `UserDeactivatedEvent` — nome = `User.deactivated` |

**Critérios de aceite:**
- [ ] Eventos são emitidos e consumidos corretamente pelos handlers

---

### F04 — Correção WalletCreatedEvent (Integration Events)

**Descrição:** Verificar se `WalletCreatedEvent` está enviando `userId` correto (atualmente envia `aggregateId` como ID da wallet).

**Requisitos:**

| ID | Requisito |
|---|---|
| F04-R01 | `WalletCreatedEvent` deve conter `userId` = ID do usuário, não ID da wallet |
| F04-R02 | Revisar `user.integration-events.ts` para garantir payload correto |

**Critérios de aceite:**
- [ ] Handler de criação de wallet recebe `userId` correto

---

### F05 — Notification Handlers (Eventos de Usuário)

**Descrição:** Implementar handlers de notificação para os eventos de usuário.

**Requisitos:**

| ID | Requisito |
|---|---|
| F05-R01 | `handleUserUpdated` — criar notificação `USER_UPDATED` |
| F05-R02 | `handleUserDeactivationRequested` — notificação `DEACTIVATION_REQUESTED` |
| F05-R03 | `handleUserDeactivated` — notificação `USER_DEACTIVATED` |

**Critérios de aceite:**
- [ ] Cada evento gera notificação no banco
