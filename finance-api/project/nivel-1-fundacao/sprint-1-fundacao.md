# Sprint 1 — Fundação & Correções Iniciais

**Período:** 1 semana
**Prioridade:** 🔴 Crítica
**Dependências:** Nenhuma

---

## 📋 Resumo

Preparar o terreno para o desenvolvimento: corrigir typos, instalar dependências faltantes, arrumar arquivos quebrados e configurar o ambiente corretamente.

---

## 🎯 Features

### F01 — Correção de Typos

**Descrição:** Corrigir arquivos e classes com nomes incorretos que afetam a importação e execução do código.

**Requisitos:**

| ID | Requisito | O que verificar |
|---|---|---|
| F01-R01 | Renomear `reuqest-deactivate.ts` → `request-deactivation.use-case.ts` | Arquivo existe com nome errado |
| F01-R02 | Renomear `oder.entity.ts` → `order.entity.ts` | Nome no sistema de arquivos e todas as importações |
| F01-R03 | Renomear `Satatus.enum.ts` → `status.enum.ts` | Nome do arquivo e referência da classe |
| F01-R04 | Corrigir `SustemUserAggregate` → `SystemUserAggregate` | Classe em `system-user.aggregate.ts` |
| F01-R05 | Corrigir `CreationgFailedEvent` → `CreationFailedEvent` | Nome do evento em `system-users.events.ts` |
| F01-R06 | Remover diretório duplicado `src/modules/profile/profile-users/domain/repositorie/` | Conteúdo obsoleto, verificar imports |

**Critérios de aceite:**
- [ x ] `npm run build` passa sem erros
- [ ] Nenhum import quebrado nos módulos afetados

---

### F02 — Correção Template Literal Quebrado

**Descrição:** Arrumar `system-application.decorator.ts` que possui template literal inválido.

**Requisitos:**

| ID | Requisito |
|---|---|
| F02-R01 | Corrigir a concatenação no decorator para gerar o path correto da rota |

**Critérios de aceite:**
- [ x ] Decorator gera o prefixo correto para módulos System

---

### F03 — Instalar Dependências Faltantes (JWT)

**Descrição:** Instalar pacotes necessários para autenticação JWT.

**Requisitos:**

| ID | Requisito |
|---|---|
| F03-R01 | Instalar `@nestjs/jwt`, `@nestjs/passport`, `passport`, `passport-jwt`, `@types/passport-jwt` |

**Critérios de aceite:**
- [ x ] `package.json` contém as dependências
- [ x ] `npm install` conclui sem erros

---

### F04 — Configurar Variáveis de Ambiente

**Descrição:** Garantir que `.env` e `.env.example` contenham todas as variáveis necessárias.

**Requisitos:**

| ID | Requisito |
|---|---|
| F04-R01 | Adicionar `JWT_SECRET` e `JWT_EXPIRATION` |
| F04-R02 | Documentar todas as variáveis no `.env.example` |

**Critérios de aceite:**
- [ x ] `.env` contém valores padrão funcionais
- [ x ] `.env.example` documenta todas as variáveis

---

### F05 — Estrutura de Pastas do IAM

**Descrição:** Criar a estrutura de diretórios do módulo IAM conforme planejado.

**Requisitos:**

| ID | Requisito |
|---|---|
| F05-R01 | Criar `src/modules/IAM/guards/roles.guard.ts` |
| F05-R02 | Garantir que `src/modules/IAM/` tenha a estrutura: `iam.module.ts`, `auth/`, `strategies/`, `guards/`, `decorators/` |

**Critérios de aceite:**
- [ ] Estrutura IAM completa e importável
