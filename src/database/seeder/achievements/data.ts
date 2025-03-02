import { Achievement } from "src/achievements/entities/achievement.entity";
import { DeepPartial } from "typeorm";

export const achievements: DeepPartial<Achievement>[] = [
    {
        code: 'USER_POINTS_100',
        title: 'Primeiros Passos',
        description: 'Acumule 100 pontos no sistema.'
    },
    {
        code: 'USER_POINTS_250',
        title: 'Subindo de Nível',
        description: 'Acumule 250 pontos no sistema.'
    },
    {
        code: 'USER_POINTS_500',
        title: 'Veterano em Pontos',
        description: 'Acumule 500 pontos no sistema.'
    },
    {
        code: 'USER_POINTS_1000',
        title: 'Mestre dos Pontos',
        description: 'Acumule 1000 pontos no sistema.'
    },
    {
        code: 'POSTS_CREATED_FIRST',
        title: 'Primeira Contribuição',
        description: 'Crie seu primeiro post.'
    },
    {
        code: 'POSTS_CREATED_25',
        title: 'Criador Assíduo',
        description: 'Crie 25 posts.'
    },
    {
        code: 'POSTS_CREATED_50',
        title: 'Criador Frequente',
        description: 'Crie 50 posts.'
    },
    {
        code: 'POSTS_CREATED_100',
        title: 'Criador de Conteúdo',
        description: 'Crie 100 posts.'
    },
    {
        code: 'TASKS_COMPLETED_1',
        title: 'Primeira Conclusão',
        description: 'Complete sua primeira tarefa.'
    },
    {
        code: 'TASKS_COMPLETED_10',
        title: 'Executor Dedicado',
        description: 'Complete 10 tarefas.'
    },
    {
        code: 'TASKS_COMPLETED_25',
        title: 'Mestre da Produtividade',
        description: 'Complete 25 tarefas.'
    },
    {
        code: 'TASKS_COMPLETED_50',
        title: 'Lenda das Tarefas',
        description: 'Complete 50 tarefas.'
    },
];