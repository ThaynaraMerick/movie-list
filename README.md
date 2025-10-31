## 🎃 Movie List – Edição Especial de Halloween

Aplicação desenvolvida para buscar filmes, favoritar e compartilhar listas com outras pessoas.
Nesta edição especial de Halloween, o tema visual foi adaptado para a data, mas o sistema permite buscar qualquer filme disponível na API pública do TMDB (The Movie Database).

## ⚙️ Funcionalidades

- Busca de filmes em tempo real via API do TMDB

- Favoritar e remover filmes facilmente

- Armazenamento de listas personalizadas no MongoDB

- Geração de links únicos para compartilhar listas

- Visualização pública de listas compartilhadas

- Integração completa entre frontend (React) e backend (Node.js + Express)

## Visão Geral da Arquitetura

O Movie List foi desenvolvido com uma arquitetura simples, porém escalável, dividida em duas camadas principais:
Frontend (React + Vite) e Backend (Node.js + Express + MongoDB).

A comunicação entre as camadas ocorre via API REST, e o projeto foi estruturado para facilitar a manutenção, a extensão de funcionalidades e o deploy independente.

## 📁 Estrutura do Projeto

O repositório está organizado da seguinte forma:

## 🛠️ Backend (/backend)

Responsável por toda a lógica da aplicação, persistência de dados e integração com a API do TMDB.

- server.js: ponto de entrada do servidor Express.

- src/app.js: configura middlewares, rotas e inicializa o app.

- src/config/db.js: gerencia a conexão com o MongoDB.

- src/controllers/: contém a lógica de negócio (ex.: favoritesController.js).

- src/models/: define os schemas do Mongoose (ex.: Favorite.js).

- src/routes/: organiza as rotas da aplicação (favoritesRoutes.js, moviesRoutes.js).

- .env: armazena variáveis de ambiente como PORT, MONGO_URI e TMDB_API_KEY.

O backend foi projetado para ser facilmente implantado no Render, mas pode rodar localmente com Node.js 18+.

## 🛠️ Frontend (/frontend)

Interface construída com React (Vite), utilizando hooks, componentes modulares e integração direta com a API.

- src/pages/: telas principais da aplicação (Home, Favorites, Share).

- src/hooks/useFavorites.js: hook customizado que centraliza a lógica de favoritos e persistência local.

- src/services/tmdbService.js: responsável por consumir a API do TMDB.

- .env: define variáveis de ambiente como VITE_API_URL e VITE_TMDB_API_KEY.

O frontend utiliza React Router DOM para navegação e Axios para chamadas HTTP.
O design segue o tema escuro com toques de laranja e roxo para celebrar o Halloween 🎃.

## ⚙️ Tecnologias Utilizadas

## Frontend
- React.js (Vite)
- React Router DOM
- Axios
- React Icons
  
## Backend
- Node.js
- Express
- Mongoose
- UUID
- CORS
- Dotenv

## Banco de Dados
- MongoDB Atlas (cloud-hosted)

## API Externa
- TMDB (The Movie Database)

## 🧰 Como Executar o Projeto
1️. Clonar o repositório
git clone https://github.com/ThaynaraMerick/movie-list.git

cd movie-list

2. Backend 
- cd backend
- npm install

Crie um arquivo .env com as variáveis:

PORT=5000
MONGO_URI=sua_string_do_mongodb
TMDB_API_KEY=sua_chave_do_tmdb

Inicie o servidor:
- npm run dev

O backend estará disponível em:
http://localhost:5000

3. Frontend
- cd ../movie-list
- npm install

Crie o arquivo .env dentro da pasta movie-list com o seguinte conteúdo:

VITE_API_URL=http://localhost:5000
VITE_TMDB_API_KEY=sua_chave_do_tmdb

Depois, inicie o projeto com:
- npm run dev

A aplicação ficará disponível em:
http://localhost:5173 (ou a porta indicada pelo Vite)

## 🧪 Testes de API

A API do Movie List é simples e segue o padrão REST, permitindo salvar e consultar listas de filmes favoritas.
Durante o desenvolvimento, os testes foram realizados principalmente com o Postman, mas também podem ser feitos via cURL ou qualquer cliente HTTP.

## ➕ Criar uma lista de favoritos

Endpoint:
POST /api/favorites

Este endpoint salva uma lista personalizada de filmes no banco de dados.
Cada lista recebe um shareId único, que pode ser usado para compartilhar o conteúdo depois.

## 🔍 Consultar uma lista compartilhada

Endpoint:
GET /api/favorites/:shareId

Retorna os filmes associados ao shareId informado.
Se o ID for válido, a API responde com todos os dados da lista salva anteriormente.

## ☁️ Deploy
## 🌐 Frontend (Vercel)

O frontend está publicado no Vercel e acessível em:
https://movie-list-cyan-alpha.vercel.app

## 📸 Visual da Aplicação
- Tela inicial com busca de filmes
- Página de favoritos
- Página de lista compartilhada com tema de Halloween

## 🖥️ Resultado

https://github.com/user-attachments/assets/c0b2751a-94d5-4f04-b837-c6c93ab33ad9

## 📜 Licença
- Este projeto é para uso educacional e pode ser reutilizado com fins de aprendizado.
