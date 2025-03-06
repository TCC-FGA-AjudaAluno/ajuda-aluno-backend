import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthUser } from 'src/users/auth/auth.decorator';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { User } from 'src/users/user.entity';
import { TodosService } from './todos.service';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
    constructor(private service: TodosService) {}

    @Get('/')
    @UseGuards(AuthGuard)
    async findAll(@AuthUser() user: User) {
        return this.service.listUserTodos(user.id)
    }

    @Post('/')
    @UseGuards(AuthGuard)
    async create(@Body() body: CreateTodoDTO, @AuthUser() user: User) {
        return this.service.createTodo(body, user.id)
    }

    @Get('/:todoId')
    @UseGuards(AuthGuard)
    async findOne(@Param('todoId') todoId: string) {
        return this.service.getTodo(todoId)
    }

    @Patch('/:todoId')
    @UseGuards(AuthGuard)
    async updateTodo(@Param('todoId') todoId: string, @Body() body: UpdateTodoDTO) {
        return this.service.updateTodo(todoId, body)
    }
}
