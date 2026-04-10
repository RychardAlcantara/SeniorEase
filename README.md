# SeniorEase

SeniorEase é uma plataforma digital acessível desenvolvida para ajudar pessoas idosas a gerenciar tarefas acadêmicas e profissionais de forma simples, intuitiva e segura.
O projeto foi criado com foco em acessibilidade digital, reduzindo barreiras comuns enfrentadas por usuários da terceira idade ao utilizar sistemas modernos.

---

## Objetivo

O objetivo do SeniorEase é promover inclusão digital, autonomia e confiança para pessoas idosas ao utilizar plataformas digitais.
A aplicação foi projetada considerando dificuldades comuns relatadas por esse público, como:

- Perda gradual de memória
- Dificuldades de visão (baixo contraste e fontes pequenas)
- Redução da coordenação motora fina
- Pouca familiaridade com interfaces digitais modernas
- Medo de cometer erros irreversíveis
- Dificuldade em compreender fluxos complexos

---

## Problemas Identificados

Usuários idosos relataram dificuldades ao utilizar plataformas digitais atuais devido a:

- Excesso de informação na tela
- Botões pequenos
- Fontes reduzidas
- Baixo contraste
- Navegação pouco intuitiva
- Ausência de feedback após ações
- Fluxos com muitas etapas

---

## Solução Proposta

SeniorEase foi desenvolvido para oferecer uma experiência digital simplificada com:

- Interface limpa e intuitiva
- Botões grandes e acessíveis
- Alto contraste visual
- Feedback claro após ações
- Navegação simples
- Fluxo reduzido de tarefas
- Tutorial de ajuda integrado

---

## Funcionalidades

- Autenticação completa (login, cadastro, recuperação de senha)
- Edição de perfil com foto, nome e sobrenome
- Troca de senha com reautenticação segura
- Visualização de tarefas
- Criação de novas tarefas
- Edição de tarefas
- Conclusão de tarefas
- Histórico de tarefas concluídas
- Sistema de notificações (sino no Navbar com badge)
- Lembrete de tarefas no dia do vencimento e 1 hora antes
- Modo de alto contraste para acessibilidade
- Painel de ajuda e tutorial
- Proteção de rotas (usuário deslogado não acessa o dashboard)

---

## Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| **Next.js 15** | Framework React com App Router |
| **React** | Biblioteca de interface |
| **TypeScript** | Tipagem estática |
| **Material UI (MUI)** | Componentes de interface |
| **Firebase Auth** | Autenticação de usuários |
| **Firestore** | Banco de dados em tempo real |
| **Nodemailer + Gmail** | Envio de e-mails |
| **Firebase Admin SDK** | Geração de links de reset server-side |

---

## Arquitetura

O projeto utiliza **Clean Architecture** combinada com **Componentização**, garantindo separação de responsabilidades, testabilidade e facilidade de manutenção.

### Princípios aplicados

- **Domain** não conhece nenhuma lib externa — só regras de negócio puras
- **Infrastructure** implementa as interfaces do domain com Firebase, Nodemailer, etc.
- **Container** centraliza a injeção de dependências
- **Presentation** usa apenas componentes reutilizáveis, sem lógica de negócio
- **Pages** apenas orquestram estado e chamam use cases

### Estrutura de pastas

```
src/
├── app/                                  # Páginas e API Routes (Next.js App Router)
│   ├── api/
│   │   ├── auth/
│   │   │   └── forgot-password/
│   │   │       └── route.ts             # Envio de e-mail de recuperação de senha
│   │   └── notifications/
│   │       └── remind/
│   │           └── route.ts             # Envio de e-mail de lembrete de tarefa
│   ├── dashboard/
│   │   └── page.tsx                     # Página principal (protegida)
│   ├── forgot-password/
│   │   └── page.tsx                     # Recuperação de senha
│   ├── login/
│   │   └── page.tsx                     # Autenticação
│   ├── profile/
│   │   └── page.tsx                     # Edição de perfil e troca de senha
│   ├── register/
│   │   └── page.tsx                     # Cadastro de usuário
│   ├── layout.tsx                       # Layout raiz com AuthProvider
│   └── page.tsx                         # Redireciona para /login
│
├── domain/                              # Regras de negócio (sem dependências externas)
│   ├── entities/
│   │   ├── Notification.ts              # Entidade de notificação
│   │   ├── Task.ts                      # Entidade de tarefa
│   │   ├── User.ts                      # Entidade de usuário
│   │   └── UserProfile.ts              # Entidade de perfil
│   ├── repositories/                    # Interfaces (contratos)
│   │   ├── AuthRepository.ts
│   │   ├── NotificationRepository.ts
│   │   ├── TaskRepository.ts
│   │   └── UserProfileRepository.ts
│   └── usecases/                        # Casos de uso com validações
│       ├── ChangePasswordUseCase.ts
│       ├── CheckTodayTasksUseCase.ts
│       ├── CreateTask.ts
│       ├── ForgotPasswordUseCase.ts
│       ├── GetUnreadNotificationsUseCase.ts
│       ├── GetUserProfileUseCase.ts
│       ├── MarkNotificationReadUseCase.ts
│       ├── SaveUserProfileUseCase.ts
│       ├── SignInUseCase.ts
│       ├── SignOutUseCase.ts
│       └── SignUpUseCase.ts
│
├── infrastructure/                      # Implementações concretas
│   ├── repositories/
│   │   ├── FirebaseAuthRepository.ts    # Auth com Firebase
│   │   ├── FirebaseNotificationRepository.ts
│   │   ├── FirebaseUserProfileRepository.ts
│   │   └── TaskRepositoryImpl.ts
│   ├── template/
│   │   ├── resetPasswordEmailTemplate.ts
│   │   └── taskReminderEmailTemplate.ts
│   ├── AuthContext.tsx                  # Estado global de autenticação
│   ├── container.ts                     # Injeção de dependências
│   └── firebase.ts                      # Configuração do Firebase
│
└── presentation/                        # Componentes de UI
    ├── components/
    │   ├── auth/                        # Componentes reutilizáveis de autenticação
    │   │   ├── AlertMessage.tsx
    │   │   ├── AuthButton.tsx
    │   │   ├── AuthCard.tsx
    │   │   ├── AuthInput.tsx
    │   │   ├── AuthLink.tsx
    │   │   └── PasswordInput.tsx
    │   ├── profile/                     # Componentes de perfil
    │   │   ├── PhotoUpload.tsx
    │   │   └── UserAvatar.tsx
    │   ├── Button.tsx
    │   ├── CreateTaskButton.tsx
    │   ├── HistoryList.tsx
    │   ├── Navbar.tsx                   # Navbar com sino de notificações
    │   ├── NotificationBell.tsx         # Componente do sino
    │   ├── PrivateRoute.tsx             # Guard para rotas autenticadas
    │   ├── PublicRoute.tsx              # Guard para rotas públicas
    │   ├── TaskItem.tsx
    │   ├── TaskList.tsx
    │   └── useNotifications.ts          # Hook de notificações
    └── contexts/
        └── ContrasteContext.tsx         # Contexto de alto contraste
```

### Fluxo da Clean Architecture

```
Page (UI)
  └── chama UseCase
        └── UseCase valida e orquestra
              └── Repository (interface do domain)
                    └── FirebaseXxxRepository (infrastructure)
                          └── Firebase / Nodemailer / etc.
```

### Fluxo de autenticação

```
Usuário acessa qualquer rota
        ↓
AuthContext verifica sessão via onAuthStateChanged
        ↓
┌── Deslogado → PublicRoute libera /login, /register, /forgot-password
│              PrivateRoute redireciona para /login
└── Logado   → PublicRoute redireciona para /dashboard
               PrivateRoute libera /dashboard, /profile, etc.
```

### Fluxo de notificações

```
Usuário abre o dashboard
        ↓
useNotifications(tasks) executa
        ↓
CheckTodayTasksUseCase filtra tarefas:
  ├── Vence hoje     → cria notificação no Firestore
  └── Falta 1 hora  → cria notificação no Firestore
        ↓
NotificationBell lê notificações não lidas em tempo real
  └── Badge vermelho exibe a contagem no sino do Navbar
```

---

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# Api do Resend
RESEND_API_KEY=
# Firebase Client SDK
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=
```

> Para obter as variáveis do Firebase Client SDK, acesse **Firebase Console → Configurações do projeto → Seus apps**.
> Para o Firebase Admin SDK, acesse **Firebase Console → Configurações do projeto → Contas de serviço → Gerar nova chave privada**.
> Para o Gmail, gere uma **App Password** em [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) com o 2FA ativado.

---

## Como Executar o Projeto

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no [Firebase](https://firebase.google.com)
- Conta no [Gmail](https://gmail.com) com 2FA ativado

### Passo a passo

**1. Clone o repositório**

```bash
git clone https://github.com/seu-usuario/seniorease.git
cd seniorease
```

**2. Instale as dependências**

```bash
npm install
```

**3. Configure as variáveis de ambiente**

```bash
cp .env.local.example .env.local
```

Preencha todas as variáveis conforme a seção anterior.

**4. Execute o projeto**

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

---

## Scripts Disponíveis

```bash
npm run dev      # Inicia em modo desenvolvimento
npm run build    # Gera build de produção
npm run start    # Inicia o servidor de produção
npm run lint     # Verifica erros de lint
```

---

## Licença

Este projeto foi desenvolvido para fins acadêmicos.
