# To-Do List com React e Firebase

Este é um projeto full-stack de um Gerenciador de Tarefas (To-Do List) que permite aos usuários criar, editar, excluir e marcar tarefas como concluídas. A aplicação é integrada com o Firebase/Firestore para armazenamento e consulta de dados em tempo real, com as tarefas vinculadas a contas de usuário individuais.

## 🛠️ Tecnologias Utilizadas

-   React: Biblioteca JavaScript para criar a interface de usuário.
-   TypeScript: Superset do JavaScript que adiciona tipagem estática.
-   Firebase (Firestore): Banco de dados NoSQL em nuvem para armazenar, sincronizar e consultar os dados das tarefas.
-   React Icons: Biblioteca para incluir ícones populares no projeto.
-   Date-fns: Para manipulação e formatação de datas.
-   Animate.css: Para adicionar animações aos elementos da interface.

## 🚀 Funcionalidades

-   Autenticação de Usuário: As tarefas são salvas e exibidas por usuário.
-   Operações CRUD completas:
-   Criar: Adicionar novas tarefas à lista.
-   Ler: Visualizar todas as tarefas.
-   Atualizar: Editar o nome e a descrição de uma tarefa ou marcá-la como concluída.
-   Deletar: Remover tarefas da lista.
-   Filtragem e Ordenação: Opções para filtrar tarefas por data, nome ou tags.
-   Interface Interativa: Uso de modais para edição, criação e confirmação de exclusão de tarefas.
-   Feedback Visual: Animação de confete ao completar uma tarefa.

# 📦 Como Executar o Projeto

-   1 - Clone este repositório: git clone `https://github.com/daniel-olive/todoList`
-   2 - Navegue até o diretório do projeto: cd `todolist`
-   3 - Crie um arquivo .env.local na raiz do projeto e adicione suas credenciais do Firebase:

    `VITE_FIREBASE_API_KEY=SUA_API_KEY`
    `VITE_FIREBASE_AUTH_DOMAIN=SEU_AUTH_DOMAIN`
    `VITE_FIREBASE_PROJECT_ID=SEU_PROJECT_ID`
    `VITE_FIREBASE_STORAGE_BUCKET=SEU_STORAGE_BUCKET`
    `VITE_FIREBASE_MESSAGING_SENDER_ID=SEU_SENDER_ID`
    `VITE_FIREBASE_APP_ID=SEU_APP_ID`

-   4 - Instale as dependências: npm install
-   5 - Inicie o servidor de desenvolvimento: npm run dev
-   6 - Acesse o projeto em seu navegador, geralmente em: http://localhost:5173

# 🎨 Layout

-   A interface do projeto é limpa e moderna, focada na usabilidade para o gerenciamento de tarefas.
-   Utiliza uma abordagem baseada em componentes, com modais para interações como adicionar, editar e excluir tarefas, proporcionando uma experiência de usuário fluida e sem a necessidade de recarregar a página.

# 📄 Licença

-   Este projeto está licenciado sob a [MIT License](LICENSE).
