Monolithic System - Arquitetura Modular

Este repositório contém um sistema monolítico bem arquitetado, onde a separação de responsabilidades é feita através de módulos independentes que se comunicam por meio de **facades**. Isso garante um baixo acoplamento entre os módulos, utilizando contratos para a troca de informações.

## 🏗 Arquitetura

- **Modular**: Cada módulo tem sua própria responsabilidade e se comunica com os outros apenas por contratos.
- **Facades**: Intermediários para comunicação entre módulos, evitando dependências diretas.
- **Express**: Framework utilizado para construir a API de maneira eficiente e escalável.
- **Testes Unitários**: Cobertura total do código para garantir confiabilidade e manutenção da aplicação.

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/) para testes unitários
- [SQLite](https://www.sqlite.org/) como banco de dados (para fins de desenvolvimento)

## ✅ Como Rodar o Projeto

### 1️⃣ Instale as dependências

```
npm install
```

### 2️⃣ Rode as migrações do banco de dados

```
npm run migrate
```

### 3️⃣ Inicie o servidor

```
npm run dev
```

### 4️⃣ Execute os testes

```
npm run test
```

## 📌 Observações

Este projeto segue os princípios de **Clean Architecture** e **Domain-Driven Design (DDD)** para garantir um código limpo, escalável e de fácil manutenção.

---

Desenvolvido com ❤️ e boas práticas! 🚀`
