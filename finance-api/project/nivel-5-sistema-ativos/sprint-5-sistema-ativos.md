# Sprint 5 — Sistema & Ativos

**Período:** 1 semana
**Prioridade:** 🟡 Alta
**Dependências:** Sprint 2 (auth com guards)

---

## 📋 Resumo

Completar o módulo System (usuários do sistema), implementar guards, decorators e garantir CRUD completo de ativos.

---

## 🎯 Features

### F01 — System Module (Completar)

**Descrição:** Importar `SystemUsersModule` e `AssetsModule` corretamente no `SystemModule`.

**Requisitos:**

| ID | Requisito |
|---|---|
| F01-R01 | `SystemModule` importa `SystemUsersModule` e `AssetsModule` |
| F01-R02 | Garantir que as rotas estejam sob prefixo `/system` |

**Critérios de aceite:**
- [ ] Rotas de sistema respondem corretamente

---

### F02 — System Users CRUD

**Descrição:** Implementar use cases (create, update, delete, findall, findone) e conectar ao controller.

**Requisitos:**

| ID | Requisito | Use Case |
|---|---|---|
| F02-R01 | `create.use-case.ts` — criar usuário do sistema com hash de senha | Apenas SYS_ADMIN pode criar |
| F02-R02 | `update.use-case.ts` — atualizar dados | Apenas SYS_ADMIN ou próprio usuário |
| F02-R03 | `delete.use-case.ts` — remover usuário | Apenas SYS_ADMIN |
| F02-R04 | `findall.use-case.ts` — listar com paginação | Apenas SYS_ADMIN |
| F02-R05 | `findone.use-case.ts` — buscar por ID | Apenas SYS_ADMIN ou próprio usuário |

**Critérios de aceite:**
- [ ] CRUD completo de system-users via controller

---

### F03 — System User Controller (Rotas)

**Descrição:** Adicionar decorators HTTP (`@Get`, `@Post`, `@Patch`, `@Delete`, etc.) e conectar aos use cases.

**Requisitos:**

| ID | Requisito |
|---|---|
| F03-R01 | `POST /system/users` — criar |
| F03-R02 | `GET /system/users` — listar |
| F03-R03 | `GET /system/users/:id` — buscar |
| F03-R04 | `PATCH /system/users/:id` — atualizar |
| F03-R05 | `DELETE /system/users/:id` — deletar |

**Critérios de aceite:**
- [ ] Todas as rotas funcionam com autenticação e roles

---

### F04 — System Guard

**Descrição:** Implementar guard de sistema que verifica token de API e role SYS_ADMIN.

**Requisitos:**

| ID | Requisito |
|---|---|
| F04-R01 | Implementar lógica de validação (atualmente vazio) |
| F04-R02 | Verificar `x-api-token` header OU JWT válido com role SYS_ADMIN |

**Critérios de aceite:**
- [ ] Rota sem token/role adequada retorna 401/403

---

### F05 — System Application Decorator

**Descrição:** Corrigir e garantir que o decorator funcione para prefixar rotas de sistema.

**Requisitos:**

| ID | Requisito |
|---|---|
| F05-R01 | Template literal corrigido (issue do Sprint 1) |
| F05-R02 | Decorator aplica prefixo `/finance/api/v1/system` + `ApiTags` |

**Critérios de aceite:**
- [ ] Rotas de sistema têm prefixo correto
