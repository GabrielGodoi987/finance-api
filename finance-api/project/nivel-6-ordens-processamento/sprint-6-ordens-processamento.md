# Sprint 6 — Ordens & Processamento

**Período:** 2 semanas
**Prioridade:** 🔴 Crítica
**Dependências:** Sprint 5 (ativos completos), Sprint 3 (usuários com carteira)

---

## 📋 Resumo

Refatorar o módulo de ordens para DDD (Use Cases, Aggregate, Repository) e implementar todas as regras de negócio (RN07–RN15, RN21–RN22).

---

## 🎯 Features

### F01 — Refatorar para DDD

**Descrição:** Transformar `OrdersService` atual em use cases + aggregate + repository seguindo DDD.

**Requisitos:**

| ID | Requisito |
|---|---|
| F01-R01 | Criar `OrderAggregate` em `domain/order.aggregate.ts` |
| F01-R02 | Criar `OrderRepository` (interface) e `OrderRepositoryImpl` (Prisma) |
| F01-R03 | Dividir service em use cases: `CreateOrderUseCase`, `ExecuteOrderUseCase`, `CancelOrderUseCase`, `FindAllOrdersUseCase`, `FindOneOrderUseCase` |
| F01-R04 | Criar `OrderMapper` para conversão aggregate ↔ persistência |
| F01-R05 | Registrar dependências no `OrdersModule` |

**Critérios de aceite:**
- [ ] Módulo de ordens segue padrão DDD (aggregate, use cases, repository)
- [ ] `npm run build` passa

---

### F02 — Regras de Negócio de Criação (RN07–RN15)

**Descrição:** Implementar validações de negócio ao criar ordem.

**Requisitos:**

| ID | Requisito | RN |
|---|---|---|
| F02-R01 | Ordem pertence a um usuário e um ativo (validar existência de ambos) | RN07 |
| F02-R02 | Tipos: `BUY` e `SELL` (via enum) | RN08 |
| F02-R03 | Status: `PENDING`, `EXECUTED`, `CANCELED`, `REJECTED` | RN09 |
| F02-R04 | Ordem criada apenas como `PENDING` (não permitir status no body) | RN10 |
| F02-R05 | `totalPrice = quantity * price` calculado automaticamente | RN11 |
| F02-R06 | `BUY`: validar saldo suficiente na carteira, senão `REJECTED` | RN14 |
| F02-R07 | `SELL`: validar quantidade suficiente na holding, senão `REJECTED` | RN14 |
| F02-R08 | Ordem `BUY` PENDING bloqueia saldo (reserva) | RN15 |

**Critérios de aceite:**
- [ ] `POST /orders` valida todas as regras
- [ ] Erro 422 se regras de negócio forem violadas

---

### F03 — Cancelamento de Ordem (RN12–RN13)

**Descrição:** Endpoint para cancelar ordem.

**Requisitos:**

| ID | Requisito | RN |
|---|---|---|
| F03-R01 | `PATCH /orders/:id/cancel` — cancelar ordem PENDING | RN12 |
| F03-R02 | Apenas o dono da ordem pode cancelar | RN12 |
| F03-R03 | Ordem `EXECUTED` ou `CANCELED` não pode ter status alterado | RN13 |
| F03-R04 | Se BUY, desbloquear saldo reservado | RN15 |

**Critérios de aceite:**
- [ ] `PATCH /orders/:id/cancel` funciona com validação

---

### F04 — Execução de Ordem (RN21–RN22)

**Descrição:** Endpoint manual de execução de ordem.

**Requisitos:**

| ID | Requisito | RN |
|---|---|---|
| F04-R01 | `POST /orders/:id/execute` — executar ordem PENDING | RN21 |
| F04-R02 | Revalidar saldo/quantidade no momento da execução | RN22 |
| F04-R03 | BUY: deduzir saldo (desbloquear reserva), incrementar holding | RN19 |
| F04-R04 | SELL: creditar saldo, decrementar holding | RN20 |
| F04-R05 | Se falhar, status → `REJECTED` | RN22 |
| F04-R06 | Apenas o dono pode executar | — |

**Critérios de aceite:**
- [ ] `POST /orders/:id/execute` executa ordem e altera estado

---

### F05 — Status Validation

**Descrição:** Garantir que `StatusEnum` cubra todos os estados necessários.

**Requisitos:**

| ID | Requisito |
|---|---|
| F05-R01 | `PENDING`, `EXECUTED`, `CANCELED`, `REJECTED` existentes no enum |
| F05-R02 | `OPEN` e `CLOSED` devem ser removidos se não forem usados |

**Critérios de aceite:**
- [ ] Enum reflete exatamente RN09

---

### F06 — DTOs Atualizados

**Descrição:** Ajustar `CreateOrderDto` e `UpdateOrderDto` conforme novas regras.

**Requisitos:**

| ID | Requisito |
|---|---|
| F06-R01 | Remover campo `status` do `CreateOrderDto` |
| F06-R02 | Remover campo `totalPrice` (calculado automaticamente) |
| F06-R03 | Adicionar validações: `quantity > 0`, `type` obrigatório, `assetId` obrigatório |
| F06-R04 | Remover `UpdateOrderDto` (ordens não são atualizadas diretamente) |

**Critérios de aceite:**
- [ ] DTOs validam entrada corretamente
