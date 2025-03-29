# Sneaky Complaints

Sistema de gerenciamento de denúncias com suporte a múltiplas empresas, cada uma com seu próprio banco de dados PostgreSQL.

## 🚀 Funcionalidades

- Autenticação e autorização de usuários
- Gerenciamento de empresas
- Banco de dados isolado por empresa
- Backup automático dos bancos de dados
- Painel administrativo
- Métricas de desempenho
- Interface moderna e responsiva

## 🛠️ Tecnologias

- Frontend:
  - React
  - TypeScript
  - Vite
  - Tailwind CSS
  - Shadcn UI
  - React Query
  - React Router

- Backend:
  - Node.js
  - Express
  - TypeScript
  - PostgreSQL
  - JWT
  - bcrypt

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/sneaky-complaints.git
cd sneaky-complaints
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```
Edite o arquivo `.env` com suas configurações.

4. Inicialize o banco de dados:
```bash
npm run db:init
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🗄️ Estrutura do Banco de Dados

O sistema utiliza uma arquitetura multi-tenant, onde cada empresa possui seu próprio banco de dados PostgreSQL. A estrutura é a seguinte:

### Banco de Dados Principal
- Tabela `companies`: Armazena informações das empresas
- Tabela `users`: Armazena usuários do sistema
- Tabela `company_databases`: Registra os bancos de dados das empresas
- Tabela `database_backups`: Registra os backups realizados

### Banco de Dados por Empresa
Cada empresa possui seu próprio banco de dados com as seguintes tabelas:
- `complaints`: Denúncias
- `users`: Usuários da empresa
- `comments`: Comentários nas denúncias
- `attachments`: Anexos
- `activity_logs`: Logs de atividades

## 🔒 Segurança

- Autenticação via JWT
- Senhas criptografadas com bcrypt
- Bancos de dados isolados por empresa
- Backup automático
- Validação de dados
- Proteção contra SQL Injection
- CORS configurado

## 📊 Monitoramento

O sistema inclui:
- Métricas de desempenho
- Logs de atividades
- Alertas de segurança
- Monitoramento de recursos

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- Seu Nome - [@seu-usuario](https://github.com/seu-usuario)

## 🙏 Agradecimentos

- [Shadcn UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PostgreSQL](https://www.postgresql.org/)
