# 📚 LibraryHub

O **LibraryHub** é uma API REST desenvolvida para o gerenciamento de uma biblioteca, permitindo o cadastro e gerenciamento de **autores**, **livros** e **empréstimos**.

O projeto foi desenvolvido com foco em **prática e aprofundamento dos conceitos de Java e Spring Boot**, explorando recursos como **Spring Data JPA, Hibernate, mapeamento de entidades e relacionamentos entre dados**.

## 🎯 Objetivo

O principal objetivo do LibraryHub é colocar em prática conceitos fundamentais do desenvolvimento de APIs utilizando o ecossistema Java, desde a estruturação da aplicação até a persistência e manipulação dos dados.

Entre os principais conceitos trabalhados estão:

* Desenvolvimento de APIs REST;
* Arquitetura em camadas;
* Injeção de dependências;
* Spring Boot;
* Persistência de dados com JPA e Hibernate;
* Mapeamento de entidades e relacionamentos;
* Criação de consultas com Spring Data JPA;
* Validação e tratamento de exceções;
* Organização e separação de responsabilidades.

## 🏗️ Arquitetura

O projeto utiliza uma **arquitetura em camadas**, buscando manter as responsabilidades da aplicação bem definidas e facilitar sua manutenção e evolução.

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

### Controller

Responsável por receber as requisições HTTP, validar os dados de entrada e encaminhar as operações para a camada de serviço.

### Service

Concentra as regras de negócio da aplicação, sendo responsável por coordenar as operações realizadas no sistema.

### Repository

Responsável pelo acesso e persistência dos dados, utilizando o **Spring Data JPA**.

## 🚀 Funcionalidades

Atualmente, o sistema possui funcionalidades para:

### 👤 Autores

* Cadastro de autores;
* Consulta de autores;
* Atualização de autores;
* Exclusão de autores;
* Relacionamento entre autores e livros.

### 📖 Livros

* Cadastro de livros;
* Consulta de livros;
* Atualização de livros;
* Exclusão de livros;
* Associação de livros aos seus respectivos autores;
* Controle de disponibilidade para empréstimo.

### 🔄 Empréstimos

* Realização de empréstimos;
* Controle da disponibilidade dos livros;
* Gerenciamento do relacionamento entre livros e empréstimos.

## 🛠️ Tecnologias

| Tecnologia          | Utilização                            |
| ------------------- | ------------------------------------- |
| **Java**            | Linguagem principal                   |
| **Spring Boot**     | Desenvolvimento da API                |
| **Spring Data JPA** | Persistência e acesso aos dados       |
| **Hibernate**       | ORM e mapeamento objeto-relacional    |
| **Maven**           | Gerenciamento de dependências e build |
| **MySQL**           | Banco de dados                        |


## 📌 Status

🚧 **Em desenvolvimento**

O LibraryHub é um projeto de estudos e continuará recebendo melhorias à medida que novos conceitos de **Java, Spring Boot e desenvolvimento de APIs** forem incorporados.

## 👨‍💻 Autor

**Guilherme Mazzega Barchi**
