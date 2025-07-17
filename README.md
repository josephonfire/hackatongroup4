# AdCharter (hackatongroup4)

Projeto desenvolvido para o Hackathon Bytes4Future - Grupo 4

## Descrição
AdCharter é uma plataforma web para análise e gestão de campanhas de marketing digital em múltiplas plataformas (Instagram, Facebook, TikTok, LinkedIn, X). Permite visualizar métricas, exportar relatórios e gerenciar campanhas de forma centralizada.

---

## Estrutura do Projeto

```
hackatongroup4/
├── client/         # Front-end React
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── data/
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
├── server/         # Back-end Node/Express
│   ├── data/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   ├── server.js
│   └── package.json
└── README.md
```

---

## Tecnologias Utilizadas

### Front-end
- React 19
- React Router v7
- Material UI (MUI)
- Recharts
- HTML2Canvas & jsPDF (exportação PDF)

### Back-end
- Node.js
- Express
- MongoDB (Atlas)
- JWT (autenticação)
- bcrypt (hash de senha)
- express-validator

---

## Como rodar o projeto

### Pré-requisitos
- Node.js >= 18
- npm >= 9

### 1. Clonar o repositório
```bash
git clone https://github.com/josephonfire/hackatongroup4.git
cd hackatongroup4
```

### 2. Instalar dependências
#### Front-end
```bash
cd client
npm install
```
#### Back-end
```bash
cd ../server
npm install
```

### 3. Configurar variáveis de ambiente
- O projeto já possui uma string de conexão MongoDB no arquivo `server/data/db.js`.
- Se necessário, ajuste para sua base de dados.

### 4. Rodar o back-end
```bash
cd server
npm start
```
O servidor estará em http://localhost:3031

### 5. Rodar o front-end
Abra outro terminal:
```bash
cd client
npm start
```
O front estará em http://localhost:3000

---

## Funcionalidades
- Cadastro e login de usuários (com validação e hash de senha)
- Dashboard com métricas de campanhas por plataforma
- Alternância de tema (claro/escuro)
- Exportação de relatórios em PDF
- Sidebar para navegação entre campanhas e funcionalidades
- Integração com MongoDB para persistência de dados

---

## Estrutura das Rotas (API)
- `/api/signup` - Cadastro de usuário
- `/api/login` - Login de usuário
- `/api/campaigns` - Dados agregados de campanhas
- `/api/facebook`, `/api/instagram`, `/api/tiktok`, `/api/linkedin`, `/api/x` - Dados por plataforma

---

## Equipa
- @josephonfire (José Pedro)
- @Ellie-Yeah (Elisabete F)
- @Gllp2 (Gonçalo Laureano)
- @Verdocas (Pedro Fernandes)

---

## Licença
Projeto académico/educacional. Uso livre para fins de estudo.
