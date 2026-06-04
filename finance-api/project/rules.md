# Regras de Negócio — Finance API

## 1. Usuário e Carteira (Wallet)

- **RN01** — Todo usuário possui exatamente uma carteira (wallet) com saldo em reais (BRL).
- **RN02** — O saldo da carteira nunca pode ser negativo.
- **RN03** — Ao criar um usuário, a carteira já deve ser criada automaticamente com saldo zero.

## 2. Ativos (Assets)

- **RN04** — Um ativo é identificado unicamente pelo seu `symbol` (ex: "PETR4", "VALE3", "BTC").
- **RN05** — O `symbol` deve conter apenas letras maiúsculas e números, sem espaços ou caracteres especiais.
- **RN06** — O preço atual de um ativo é atualizado via endpoint exclusivo (`PATCH /assets/:id/price`) e nunca via update genérico.

## 3. Ordens (Orders)

- **RN07** — Toda ordem pertence a **um usuário** e está vinculada a **um ativo**.
- **RN08** — Os tipos de ordem são: `BUY` (compra) e `SELL` (venda).
- **RN09** — Status possíveis de uma ordem: `PENDING`, `EXECUTED`, `CANCELED`, `REJECTED`.
- **RN10** — Uma ordem só pode ser criada com status `PENDING`.
- **RN11** — O valor total da ordem (`quantity * price`) deve ser calculado automaticamente no momento da criação.
- **RN12** — Uma ordem `PENDING` pode ser cancelada (`CANCELED`) a qualquer momento pelo usuário dono da ordem.
- **RN13** — Uma ordem `EXECUTED` ou `CANCELED` não pode ter seu status alterado novamente.
- **RN14** — Ao criar uma ordem:
  - **BUY**: o saldo da carteira do usuário deve ser suficiente para cobrir o valor total da ordem. Caso contrário, a ordem é rejeitada (`REJECTED`).
  - **SELL**: o usuário deve possuir em sua carteira quantidade suficiente do ativo. Caso contrário, a ordem é rejeitada (`REJECTED`).
- **RN15** — Ao criar uma ordem **BUY**, o saldo da carteira é **bloqueado** (reservado) — não pode ser usado por outras ordens enquanto a ordem estiver `PENDING`.

## 4. Portfólio (Holdings)

- **RN16** — O portfólio do usuário é composto por posições (holdings) que representam a quantidade de cada ativo que o usuário possui.
- **RN17** — Uma holding é criada automaticamente na primeira compra de um ativo.
- **RN18** — A quantidade de uma holding nunca pode ser negativa.
- **RN19** — Ao executar uma ordem `BUY`:
  - A quantidade do ativo na holding do usuário é **incrementada**.
  - O valor total da ordem é **deduzido** do saldo da carteira (desbloqueando a reserva).
- **RN20** — Ao executar uma ordem `SELL`:
  - A quantidade do ativo na holding do usuário é **decrementada**.
  - O valor total da ordem é **creditado** no saldo da carteira.

## 5. Execução de Ordens (Matching)

- **RN21** — A execução de uma ordem é **manual e explicita** — um endpoint `POST /orders/:id/execute` processa a ordem, validando todas as regras de negócio novamente no momento da execução.
- **RN22** — Se no momento da execução o saldo for insuficiente (BUY) ou a quantidade do ativo for insuficiente (SELL), a ordem é rejeitada com status `REJECTED`.

## 6. Histórico de Transações

- **RN23** — Toda execução ou rejeição de ordem deve gerar um registro de transação imutável contendo: tipo da ordem, ativo, quantidade, preço, valor total, status resultante e timestamp.
- **RN24** — Transações não podem ser alteradas ou deletadas — apenas consultadas.
