# Login Fullstack App

Projeto de autenticação fullstack desenvolvido com **Next.js** no frontend e um backend API local via `fetch`. Inclui funcionalidades de **cadastro**, **login** e **"remember me" com localStorage**.
- Projeto desenvolvido com foco em aprender sobre autenticação de usuários, integração com backend, banco de dados e uso do framework Next.js.

---

##  Tecnologias utilizadas

- **Frontend:** Next.js, React, Tailwind CSS, `next/image`
- **Estado & Navegação:** useState, useEffect, `useRouter`
- **Backend:** API REST simples (via fetch em `localhost:4000`)
- **Banco de Dados:** SQlite para armazenamento de usuários
- **Autenticação:** JWT, armazenado no `localStorage`
- **Estilização:** Tailwind CSS
- **Outros:** ícones Phosphor, imagens SVG estáticas em `/public`

---

##  Funcionalidades principais

- Tela de **Login** com formulário (usuário, senha, "remember me")
- Tela de **Cadastro** com feedback via `alert()`
- Salvamento de **nome de usuário** no `localStorage` (opcional via checkbox)
- Autenticação com sucesso redirecionando para `/dashboard`
- `localStorage` usado para manter o estado de login entre sessões
- Formulários estilizados com Tailwind, inputs alinhados e responsivos

---

##  Pré-requisitos

- Node.js (versão 14 ou superior recomendada)
- Backend rodando em `http://localhost:4000` (endpoints `/login`, `/signup` e `/dashboard`)
- Certifique-se de incluir JWT no corpo das respostas e aceitar requisições JSON

## Como rodar o projeto (Frontend e Backend)

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org) (recomendado: versão 16 ou superior)
- npm ou yarn
- (Opcional) [Postman](https://www.postman.com/) para testar a API

---

### ▶️ Rodando o Backend

1. Acesse a pasta do backend:

   ```bash
   cd backend

2. Instale as dependências:

   ```bash
   npm install

3. Inicie o servidor:

   ```bash
   npm start ou run dev, se tiver o script no package.json: "dev": "nodemon src/server.js"

O backend será iniciado em http://localhost:4000

### ▶️ Rodando o Frontend

1. Acesse a pasta do frontend:

   ```bash
   cd frontend

2. Instale as dependências:

   ```bash
   npm install

3. Inicie o servidor Next.js:

   ```bash
    npm run dev
   
4. Acesse no navegador:

   ```bash
    http://localhost:3000

O frontend se comunica com o backend via http://localhost:4000. Certifique-se de que o **backend esteja rodando** antes de fazer login ou cadastro.


