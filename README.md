# 🧠 Mind Schedule – Painel Administrativo

![Preview da aplicação](https://i.ibb.co/fdtmfwD6/2025-08-03-14-58.jpg)

Plataforma web onde profissionais podem cadastrar seus negócios, configurar horários de atendimento, definir serviços e valores, e gerenciar sua operação de forma centralizada — tudo em uma interface moderna, acessível e responsiva.

---

## 📚 Índice

- [📌 Introdução](#-introdução)
- [⚙️ Pré-requisitos](#️-pré-requisitos)
- [▶️ Como rodar](#-como-rodar)
- [🚀 Build e ambientes](#-build-e-ambientes)
- [🔧 Funcionalidades e Tecnologias](#-funcionalidades-e-tecnologias)
- [📦 Dependências principais](#-dependências-principais)
- [🌐 Deploy](#-deploy)
- [👨‍💻 Autor](#-autor)

---

## 📌 Introdução

Este repositório contém o **painel administrativo da plataforma Mind Schedule**, onde prestadores de serviço gerenciam sua operação — desde o cadastro inicial até o controle de agendamentos, dias de atendimento, valores e tipos de serviço.

O projeto utiliza tecnologias modernas e foco total em acessibilidade, escalabilidade e organização de código. Conta também com integração via API para login seguro com Clerk, sugestões geradas via IA e deploy profissional via Vercel.

---

## ⚙️ Pré-requisitos

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org)
- [pnpm](https://pnpm.io/) (opcional, mas recomendado)

---

## ▶️ Como rodar

```bash
# Clone o repositório
$ git@github.com:Coldiblaster/mind-schedule.git
# Entre na pasta
$ cd mind-schedule
# Instale as dependências
$ pnpm i
# Inicie a aplicação
$ pnpm dev
# Para acessar a aplicação acesse
$ http://localhost:3000/
```

## 🚀 Build e ambientes

pnpm build
pnpm start

.env.local:

- NEXT_PUBLIC_API_URL=https://sua-api.com
- CLERK_PUBLISHABLE_KEY=chave_aqui
- NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
- NEXT_PUBLIC_CLERK_SIGN_UP_URL=/cadastro

## 🔧 Funcionalidades e Tecnologias

- Cadastro passo a passo (onboarding)
- IA para sugestão de segmentos
- Clerk para autenticação
- Zustand para gerenciamento de estado
- Zod + React Hook Form para validação
- Next.js 15 (App Router)
- UI com Tailwind + ShadCN
- Deploy com Vercel + domínio customizado
- Boas práticas de organização, rotas protegidas, tratamento de erros, loading states

## 📦 Dependências principais

> [![React](https://img.shields.io/badge/React-000?style=for-the-badge&logo=react)](https://pt-br.reactjs.org/docs/getting-started.html)
>
> [![NextJs](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
>
> [![Tailwindcss](https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

## 🌐 Deploy
🔗 [https://mind.evolufin.com.br](https://www.mind-schedule.com.br/)

## 👨‍💻 Autor

Desenvolvido por [ Vinicius Bastazin Araujo](https://www.linkedin.com/in/vbastazin/)

