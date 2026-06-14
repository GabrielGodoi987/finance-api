# Sprint 2 — IAM & Autenticação

**Período:** 1–2 semanas
**Prioridade:** 🔴 Crítica
**Dependências:** Sprint 1 (dependências JWT instaladas, .env configurado)

---

## 📋 Resumo

Implementar o módulo completo de autenticação e autorização (JWT), incluindo sign-in, guards, estratégia JWT e decorators.

---

## 🎯 Features

### F01 — Módulo IAM

**Descrição:** Implementar o `IamModule` completo, registrando todos os componentes de autenticação.

**Requisitos:**

| ID | Requisito |
|---|---|
| F01-R01 | Importar `JwtModule.registerAsync` com `JWT_SECRET` e `JWT_EXPIRATION` do ConfigService |
| F01-R02 | Registrar `JwtStrategy`, `AuthService`, `AuthController`, `RolesGuard` como providers |
| F01-R03 | Exportar `JwtModule` e `RolesGuard` para serem usados por outros módulos |
| F01-R04 | Importar `IAMModule` no `AppModule` |

**Critérios de aceite:**
- [ ] Módulo compila e é carregado na inicialização

---

### F02 — AuthController

**Descrição:** Endpoint público `POST /auth/sign-in` para login.

**Requisitos:**

| ID | Requisito |
|---|---|
| F02-R01 | Rota `POST /auth/sign-in` aceita `{ email, password }` |
| F02-R02 | Validação via class-validator (`@IsEmail()`, `@IsString()`) |
| F02-R03 | Documentação Swagger com `@ApiTags`, `@ApiBody`, `@ApiResponse` |
| F02-R04 | Retorna `{ access_token: string }` em caso de sucesso |

**Critérios de aceite:**
- [ ] `POST /auth/sign-in` com credenciais válidas retorna 200 + JWT
- [ ] `POST /auth/sign-in` com email inválido retorna 401
- [ ] `POST /auth/sign-in` com senha inválida retorna 401

---

### F03 — AuthService

**Descrição:** Serviço de autenticação que valida credenciais e gera JWT.

**Requisitos:**

| ID | Requisito |
|---|---|
| F03-R01 | `validateUser(email, password)` — busca usuário por email, compara hash bcrypt |
| F03-R02 | `signIn(user)` — gera JWT via `JwtService.sign()` com payload `{ sub, email, name, role }` |
| F03-R03 | `findByEmail(email)` — busca usuário no repositório (injeção de dependência) |

**Critérios de aceite:**
- [ ] Senha é validada com bcrypt.compare
- [ ] Payload do JWT contém `sub`, `email`, `name`, `role`

---

### F04 — JwtStrategy

**Descrição:** Estratégia Passport que valida o token JWT e extrai dados do usuário.

**Requisitos:**

| ID | Requisito |
|---|---|
| F04-R01 | `validate(payload)` retorna `{ userId, email, name, role }` |
| F04-R02 | Configurada para ler token do header `Authorization: Bearer <token>` |

**Critérios de aceite:**
- [ ] Rota protegida com `AuthGuard('jwt')` funciona
- [ ] `req.user` populado corretamente

---

### F05 — RolesGuard

**Descrição:** Guard que verifica se o usuário possui a role necessária para acessar uma rota.

**Requisitos:**

| ID | Requisito |
|---|---|
| F05-R01 | Lê metadata `user-role` do decorator `@UserRoleDecorator()` |
| F05-R02 | Compara com `req.user.role` |
| F05-R03 | Retorna 403 se role for insuficiente |

**Critérios de aceite:**
- [ ] Rota com `@UserRoleDecorator('SYS_ADMIN')` bloqueia CLIENT

---

### F06 — CurrentUser Decorator

**Descrição:** Decorator `@CurrentUser()` para extrair usuário autenticado da request.

**Requisitos:**

| ID | Requisito |
|---|---|
| F06-R01 | `createParamDecorator` extrai `req.user` |
| F06-R02 | Aceita parâmetro opcional para extrair campo específico (ex: `@CurrentUser('userId')`) |

**Critérios de aceite:**
- [ ] Controller consegue acessar `@CurrentUser() user` e `@CurrentUser('userId') userId`

---

### F07 — Hash de Senha no Create Use Case

**Descrição:** Adicionar hash bcrypt ao criar usuário no Profile.

**Requisitos:**

| ID | Requisito |
|---|---|
| F07-R01 | Em `create.use-case.ts`, aplicar `bcrypt.hash(password, 10)` antes de criar o aggregate |

**Critérios de aceite:**
- [ ] Senha salva no banco está hasheada
