<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# API de Assets e Orders com Docker, Nest.js e MongoDB 🚀

Este é um projeto que cria uma API para gerenciar **assets** (ativos) e **orders** (ordens). A API está construída com **Nest.js**, utilizando **MongoDB** como banco de dados, e é containerizada com **Docker** para facilitar o deploy e a configuração do ambiente.

---

## Funcionalidades principais

- **Listar Assets**: Obtém todos os ativos.
- **Criar Assets**: Cria novos ativos informando um **id** e **symbol**.
- **Criar Orders**: Cria novas ordens associadas a um **asset**.
- **Listar Orders**: Obtém todas as ordens, com informações sobre **price**, **status**, e o **asset_id**.

---

## Tecnologias utilizadas

- **Nest.js**: Framework para o backend.
- **MongoDB**: Banco de dados NoSQL para armazenar **assets** e **orders**.
- **Docker**: Containerização para simplificar o deploy e a configuração do ambiente.

---

## Endpoints da API

### 1. Listar Assets
- **Método**: `GET`
- **Rota**: `/api/assets`
- **Descrição**: Lista todos os ativos cadastrados.
- **Resposta**:
  ```json
  [
    {
      "id": "123",
      "symbol": "BTC"
    },
    {
      "id": "456",
      "symbol": "ETH"
    }
  ]
