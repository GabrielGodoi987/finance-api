# Sprint 7 — Portfolio & Transações

**Período:** 1–2 semanas
**Prioridade:** 🟡 Alta
**Dependências:** Sprint 6 (ordens concluídas)

---

## 📋 Resumo

Implementar módulo de Portfolio (Holdings) e Histórico de Transações (Transactions), com todas as regras de negócio (RN16–RN20, RN23–RN24).

---

## 🎯 Features

### F01 — Holdings Module

**Descrição:** Criar módulo completo de holdings (posições do usuário em cada ativo).

**Requisitos:**

| ID | Requisito | RN |
|---|---|---|
| F01-R01 | Modelo Prisma: `Holding` com `id`, `userId`, `assetId`, `quantity` | RN16 |
| F01-R02 | `HoldingModule` com aggregate, repository, use cases | RN16 |
| F01-R03 | `GET /portfolio` — listar holdings do usuário autenticado | RN16 |
| F01-R04 | `GET /portfolio/:assetId` — consultar holding específica | RN16 |

**Critérios de aceite:**
- [ ] Modelo Prisma criado e migrado
- [ ] GET `/portfolio` retorna holdings com dados do ativo

---

### F02 — Regras de Negócio de Holdings

**Descrição:** Implementar RN16–RN20 no fluxo de holdings.

**Requisitos:**

| ID | Requisito | RN |
|---|---|---|
| F02-R01 | Holding criada automaticamente na primeira compra | RN17 |
| F02-R02 | Quantidade nunca negativa (validar no debit da holding) | RN18 |
| F02-R03 | BUY executado: incrementa holding + deduz saldo | RN19 |
| F02-R04 | SELL executado: decrementa holding + credita saldo | RN20 |

**Critérios de aceite:**
- [ ] Holdings criadas/atualizadas automaticamente ao executar ordens

---

### F03 — Transactions Module

**Descrição:** Criar módulo de registro imutável de transações.

**Requisitos:**

| ID | Requisito | RN |
|---|---|---|
| F03-R01 | Modelo Prisma: `Transaction` com `orderId`, `userId`, `assetId`, `type`, `quantity`, `price`, `totalPrice`, `status`, `timestamp` | RN23 |
| F03-R02 | Transação criada automaticamente ao executar ou rejeitar ordem | RN23 |
| F03-R03 | `GET /transactions` — listar transações do usuário (apenas consulta) | RN24 |
| F03-R04 | Sem endpoints de update/delete | RN24 |
| F03-R05 | Ordenação por timestamp descendente | RN24 |

**Critérios de aceite:**
- [ ] Toda execução/rejeição gera transação
- [ ] GET `/transactions` retorna histórico imutável

---

### F04 — Wallet Adjustments

**Descrição:** Garantir que saldo da carteira seja debitado/creditado corretamente nas operações.

**Requisitos:**

| ID | Requisito |
|---|---|
| F04-R01 | Saldo nunca negativo (validação no `debit()` de WalletEntity) |
| F04-R02 | Reserva (bloqueio) de saldo para ordens BUY PENDING |
| F04-R03 | Desbloqueio ao cancelar ou executar ordem |

**Critérios de aceite:**
- [ ] Saldo nunca fica negativo
- [ ] Reserva funciona corretamente
