import { Subject } from "src/subjects/entities/subjects.entity";
import { DeepPartial } from "typeorm";

export const subjects: DeepPartial<Subject>[] = [
    {
        "id": "d0cb2bd4-6793-4cd7-9a36-5f00b4cca41d",
        "name": "Algoritmos e Programação de Computadores",
        "description": "A disciplina de Algoritmos e Programação de Computadores é uma matéria fundamental nos cursos de Ciência da Computação, Engenharia de Software, Sistemas de Informação e áreas afins. Seu objetivo principal é introduzir os estudantes aos conceitos básicos de programação, lógica computacional e desenvolvimento de algoritmos, que são a base para a resolução de problemas utilizando computadores."
    },
    {
        "id": "f5ba502d-1a8a-4922-8a4e-7fda50a6a0a7",
        "name": "Estruturas de Dados 1",
        "description": "A disciplina de Estruturas de Dados é uma matéria essencial nos cursos de Ciência da Computação, Engenharia de Software, Sistemas de Informação e áreas relacionadas. Ela tem como foco o estudo de como os dados podem ser organizados, armazenados e manipulados de forma eficiente em um computador, permitindo a criação de algoritmos mais otimizados e robustos."
    },
    {
        "id": "00b2003b-c368-42aa-9802-b995760f1300",
        "name": "Cálculo 1",
        "description": "Introduz os conceitos básicos do cálculo diferencial e integral, que são essenciais para a compreensão de fenômenos contínuos e para a resolução de problemas complexos em diversas áreas do conhecimento."
    },
    {
        "id": "f775e2e7-cda0-46a1-863f-4cd49c4326fa",
        "name": "Requisitos de Software",
        "description": "A disciplina consiste no processo de identificação, análise, especificação e validação dos requisitos de um sistema de software, que são as necessidades e condições que o software deve satisfazer para atender às expectativas dos stakeholders (interessados)."
    },
    {
        "id": "8f5dd9e5-ea46-49e4-a1b8-a9c9833a0810",
        "name": "Fundamentos de Arquitetura de Computadores",
        "description": "Histórico Arquiteturas RISC X CISC Aritmética computacionalPipeline unidade de controle barramentos Introdução à Programaçãoem linguagem de montagem caminho de dados de um processador RISCHierarquia de memória: modos de endereçamento, memória virtual, memória cache."
    },
    {
        "id": "b0782ef1-191d-49f2-aaa5-10e96b73b3bf",
        "name": "Programação Para Sistemas Paralelos e Distribuídos",
        "description": "EMENTA: Conceituação de Sistemas Distribuídos. Princípios de Sistemas Distribuídos. Arquiteturas de Sistemas Distribuídos. Paradigmas de Sistemas Distribuídos. 01. Conceituação e princípios de arquiteturas paralelas e distribuídas- Introdução- Tipos e arquiteturas- Exemplos de sistemas distribuídos e paralelos. 02. Aplicações distribuídas- Construção de aplicações distribuídas com uso de middlewares- Software como serviço03. Programação paralela- Programação com MPI- Programação de sistemas com e sem memória compartilhada- Programação de GPUs"
    },
    {
        "id": "21b9004f-dddd-4df5-8d71-cffdb16dd920",
        "name": "Projeto Integrador de Engenharia 1",
        "description": "EMENTA: Noções de Projeto e Gestão de Projeto Síntese da Profissão de Engenheiro Projeto: Definições e Modelos Noções de Gerenciamento de Projeto (Ciclo de Vida e Organização de Projeto, Processos de Gerenciamento de Projetos, Gerenciamento do Escopo, Gerenciamento do Tempo do Projeto, Gerenciamento de Custos, Gerenciamento de Qualidade, Gerenciamento de Recursos Humanos, Gerenciamento das Comunicaçãoes no Projeto e Gerenciamento de Riscos) - Casos de Estudo, Pratica com Projeto Integrador."
    },
    {
        "id": "c9382088-d330-4c88-98df-1b71f6100b0c",
        "name": "Sistemas de Banco de Dados 2",
        "description": "EMENTA: EmentaProjeto Físico de Banco de Dados Relacional Programação no Servidor de Banco de Dados Relacional Alternativas de modelagem conceitual em relação ao paradigma ERTecnologias e modelagens voltadas para dados semiestruturados e não estruturados Arquiteturas e estratéégias para grandes volumes de dados"
    }]