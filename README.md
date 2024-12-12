<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Assets and Orders API with Docker, Nest.js and MongoDB 🚀

This is a project that creates an API to manage **assets** (assets) and **orders** (orders). The API is built with **Nest.js**, using **MongoDB** as the database, and is containerized with **Docker** to facilitate deployment and configuration of the environment.

---

## Main features

- **List Assets**: Gets all assets.
- **Create Assets**: Creates new assets by entering an **id** and **symbol**.
- **Create Orders**: Creates new orders associated with an **asset**.
- **List Orders**: Gets all orders, with information about **price**, **status**, and **asset_id**.

---

## Technologies used

- **Nest.js**: Framework for the backend.
- **MongoDB**: NoSQL database to store **assets** and **orders**.
- **Docker**: Containerization to simplify deployment and environment configuration.

---

## Commands to set up the project and initiates it

### Install all dependencies

```
 npm install

```

### run the docker container

```
 docker compose up -d ## this command keeps your terminal free after run the container

 ## you can use the following command to keep terminal in use, even if the conainer is up

 docker compose up

```

### check all created containers

```
 docker ps

```

### enter the bash in your docker container

```
 docker compose exec -it [containerId] bash
```

### with the following command you can start the application

```
 npm run start:dev

```
