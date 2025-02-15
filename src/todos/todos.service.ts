import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { EntityManager } from 'typeorm';
import { Todo } from './todos.entity';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
    constructor(private em: EntityManager) {}

    async listUserTodos(userId: string) {
        const result = await this.em.find(Todo, {
            where: {
                userId
            },
            select: {
                createdAt: true,
                done: true,
                id: true,
                title: true,
                dueDate: true
            },
            order: {
                dueDate: 'ASC'
            }
        })

        return result
    }

    async getTodo(todoId: string) {
        const todo = await this.em.findOne(Todo, {
            where: {
                id: todoId
            },
            relations: ['user'],
            select: {
                user: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        })

        return todo
    }

    async updateTodo(todoId: string, data: UpdateTodoDTO) {
        const updateResult = await this.em.update(Todo, todoId, data)
        return this.getTodo(todoId)
    }

    async createTodo(data: CreateTodoDTO, userId: string) {
        const todo = this.em.create(Todo, {
            title: data.title,
            description: data.description ?? null,
            dueDate: data.dueDate,
            userId: userId
        })

        await this.em.save(todo)
        return todo
    }
}
