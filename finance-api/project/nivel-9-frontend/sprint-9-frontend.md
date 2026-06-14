# Sprint 9 — Frontend (Next.js)

**Período:** 2–3 semanas
**Prioridade:** 🟢 Média
**Dependências:** Sprints 2–7 (API completa e funcional)

---

## 📋 Resumo

Desenvolver o frontend da aplicação financeira usando Next.js App Router, consumindo a API NestJS.

---

## 🎯 Features

### F01 — Setup e Configuração

**Descrição:** Configurar projeto Next.js com integração à API.

**Requisitos:**

| ID | Requisito |
|---|---|
| F01-R01 | Configurar variáveis de ambiente: `NEXT_PUBLIC_API_URL` |
| F01-R02 | Criar `api/` service layer com Axios/fetch |
| F01-R03 | Configurar interceptors para JWT |
| F01-R04 | Configurar tema global (Tailwind CSS já configurado) |
| F01-R05 | Layout base com Header, Sidebar (se aplicável) e Footer |

**Critérios de aceite:**
- [ ] Projeto compila e faz requisições à API

---

### F02 — Autenticação (Login)

**Descrição:** Tela de login e gerenciamento de sessão.

**Requisitos:**

| ID | Requisito |
|---|---|
| F02-R01 | Página `/login` com formulário de email + senha |
| F02-R02 | Validação de formulário (email válido, senha não vazia) |
| F02-R03 | Chamada à `POST /auth/sign-in` |
| F02-R04 | Armazenar JWT em cookie/httpOnly ou localStorage |
| F02-R05 | Redirecionar para dashboard após login |
| F02-R06 | Proteger rotas com middleware/layout check de autenticação |
| F02-R07 | Logout (limpar token, redirecionar para login) |

**Critérios de aceite:**
- [ ] Fluxo completo de login/logout funcionando

---

### F03 — Dashboard

**Descrição:** Página principal com visão geral.

**Requisitos:**

| ID | Requisito |
|---|---|
| F03-R01 | Cards com saldo da carteira, total de ativos, últimas transações |
| F03-R02 | Gráfico simples de distribuição do portfólio |
| F03-R03 | Lista de últimas ordens |
| F03-R04 | Notificações não lidas (badge no header) |
| F03-R05 | Atualização em tempo real (periódica ou WebSocket) |

**Critérios de aceite:**
- [ ] Dashboard exibe dados reais da API

---

### F04 — Gestão de Ativos (Assets)

**Descrição:** CRUD visual de ativos (admin).

**Requisitos:**

| ID | Requisito |
|---|---|
| F04-R01 | Página `/assets` com tabela de ativos |
| F04-R02 | Modal/Formulário para criar novo ativo |
| F04-R03 | Ação para atualizar preço |
| F04-R04 | Paginação e busca por símbolo |

**Critérios de aceite:**
- [ ] CRUD completo de ativos (role SYS_ADMIN)

---

### F05 — Ordens

**Descrição:** Visualização e criação de ordens.

**Requisitos:**

| ID | Requisito |
|---|---|
| F05-R01 | Página `/orders` com lista de ordens do usuário |
| F05-R02 | Filtros por status, tipo, ativo |
| F05-R03 | Formulário de criação de ordem (selecionar ativo, tipo, quantidade) |
| F05-R04 | Ações: cancelar (se PENDING) |
| F05-R05 | Detalhes da ordem ao clicar |

**Critérios de aceite:**
- [ ] Fluxo completo de ordens no frontend

---

### F06 — Portfolio

**Descrição:** Visualização do portfólio do usuário.

**Requisitos:**

| ID | Requisito |
|---|---|
| F06-R01 | Página `/portfolio` com lista de holdings |
| F06-R02 | Exibir quantidade, preço atual, valor total, % do portfolio |
| F06-R03 | Gráfico de pizza/distribuição |

**Critérios de aceite:**
- [ ] Portfolio exibe dados reais da API

---

### F07 — Histórico de Transações

**Descrição:** Visualização do histórico de transações.

**Requisitos:**

| ID | Requisito |
|---|---|
| F07-R01 | Página `/transactions` com lista paginada |
| F07-R02 | Filtros por tipo, ativo, data |
| F07-R03 | Badge de status (EXECUTED, REJECTED) |

**Critérios de aceite:**
- [ ] Histórico exibe dados reais da API

---

### F08 — Notificações

**Descrição:** Central de notificações.

**Requisitos:**

| ID | Requisito |
|---|---|
| F08-R01 | Dropdown de notificações no header (últimas 5) |
| F08-R02 | Página `/notifications` com lista completa |
| F08-R03 | Ação "marcar como lida" |
| F08-R04 | Ação "marcar todas como lidas" |

**Critérios de aceite:**
- [ ] Notificações funcionam com dados reais

---

### F09 — Gestão de Usuários (Admin)

**Descrição:** CRUD de usuários do sistema.

**Requisitos:**

| ID | Requisito |
|---|---|
| F09-R01 | Página `/admin/users` com lista de usuários (role SYS_ADMIN) |
| F09-R02 | Criar, editar, desativar usuários |
| F09-R03 | Filtros e paginação |

**Critérios de aceite:**
- [ ] Admin consegue gerenciar usuários

---

### F10 — Responsividade e UX

**Descrição:** Garantir boa experiência em mobile e desktop.

**Requisitos:**

| ID | Requisito |
|---|---|
| F10-R01 | Layout responsivo (mobile-first) |
| F10-R02 | Estados de loading (skeleton/spinner) |
| F10-R03 | Estados de erro (toast/mensagens amigáveis) |
| F10-R04 | Estados vazios ("Nenhum dado encontrado") |

**Critérios de aceite:**
- [ ] App funcional em mobile e desktop
