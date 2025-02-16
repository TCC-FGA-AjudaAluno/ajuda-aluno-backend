import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { EntityManager } from 'typeorm';
import { Todo } from './todos.entity';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TodosService {
    constructor(private em: EntityManager, private usersService: UsersService) {}

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
                    email: true,
                    points: true
                }
            }
        })

        return todo
    }

    async updateTodo(todoId: string, data: UpdateTodoDTO) {
        const todoBefore = await this.getTodo(todoId)
        const now = new Date()
        if (data.done && !todoBefore.done && (todoBefore.dueDate >= now)) {
            this.usersService.updatePoints(todoBefore.user, 5)
        }
        const updateResult = await this.em.update(Todo, todoId, data)
        console.log(updateResult)
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
