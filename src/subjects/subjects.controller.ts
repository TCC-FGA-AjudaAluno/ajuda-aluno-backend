import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDTO } from './dto/create-subject.dto';
import { AuthGuard } from 'src/users/auth/auth.guard';

@Controller('subjects')
export class SubjectsController {
    constructor(private service: SubjectsService) {}
    
    @UseGuards(AuthGuard)
    @Get('/')
    async findAll() {
        return this.service.findAll()
    }

    @UseGuards(AuthGuard)
    @Post('/')
    async create(@Body() body: CreateSubjectDTO) {
        return this.service.create(body)
    }
}
