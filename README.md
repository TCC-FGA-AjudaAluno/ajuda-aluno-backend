# Trabalho de conclusão de curso - AjudaAluno


# AjudaAluno Backend

![Badge de Licença](https://img.shields.io/github/license/TCC-FGA-AjudaAluno/ajuda-aluno-frontend)
![Badge de Versão](https://img.shields.io/badge/vers%C3%A3o-1.0.0-blue)

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuição](#contribuição)
- [Licença](#licença)


## Sobre o Projeto

O **AjudaAluno Backend** é a API Rest que serve como backend para o projeto AjudaAluno, desenvolvido como parte do trabalho de conclusão de curso da FGA. O objetivo do projeto é fornecer uma plataforma que auxilie alunos em suas jornadas acadêmicas, oferecendo recursos como gestão de tarefas, fórum de discussões e acompanhamento de desempenho.

## Funcionalidades

- **Gestão de Tarefas:** Permite que os alunos criem, editem e acompanhem suas tarefas acadêmicas.
- **Fórum de Discussões:** Espaço para interação entre alunos e professores, promovendo debates e esclarecimento de dúvidas.
- **Acompanhamento de Desempenho:** Visualização de métricas e estatísticas sobre o progresso acadêmico do aluno.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 22 ou superior)
- [npm](https://www.npmjs.com/)
- [docker](https://www.docker.com/)

> Obs.: Para utilizar a funcionalidade de chat, é necessário uma API Key de acesso à [API OpenAI](https://platform.openai.com/docs/overview)

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/TCC-FGA-AjudaAluno/ajuda-aluno-backend.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd ajuda-aluno-backend
   ```

3. Crie o arquivo de configuração:

    ```bash
    touch .env
    ```

4. No arquivo criado, coloque as variáveis de ambiente necessárias para o projeto:

    ```bash
    OPENAI_API_KEY="<API KEY>"
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=application
    DB_USER=application
    DB_PASS=application
    ```

## Como Usar

Para iniciar a aplicação, utilize o docker compose para executar o projeto:

```bash
docker compose up
```

A aplicação será acessível no caminho: `http://localhost:3000`.

## Estrutura de Pastas

A estrutura de pastas do projeto é organizada da seguinte forma:

```
ajuda-aluno-backend/
├── docs/
│   └── ...
├── src/
│   ├── achievements/
│   ├── database/
│   ├── users/
│   └── ...
├── .env
├── .gitignore
├── README.md
└── package.json
```

- **docs/**: Arquivos contendo diagramas de documentação do projeto.
- **src/**: Diretório principal do código-fonte. Contém os módulos do projeto separados em diretórios.
- **.gitignore**: Lista de arquivos e pastas ignorados pelo Git.
- **README.md**: Documentação do projeto.
- **package.json**: Arquivo de configuração do npm/yarn.

> *Nota: A estrutura de pastas pode variar conforme a necessidade do projeto. É importante mantê-la organizada para facilitar a manutenção e escalabilidade.*

## Tecnologias Utilizadas

- [NestJS](https://docs.nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Contribuição

Contribuições são bem-vindas! Se você deseja contribuir com este projeto, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`).
4. Faça o push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais informações.


