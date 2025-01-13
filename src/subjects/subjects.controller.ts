import { Body, Controller, Get, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDTO } from './dto/create-subject.dto';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { EnrollStudentDTO } from './dto/enroll-student.dto';

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

    @UseGuards(AuthGuard)
    @Post('/enroll')
    async enroll(@Body() body: EnrollStudentDTO) {
        console.log("User is enrolling in this course!")
        return this.service.enroll(body)
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    async findOne(@Param('id') id: string) {
        return this.service.findOne(id)
    }
}
