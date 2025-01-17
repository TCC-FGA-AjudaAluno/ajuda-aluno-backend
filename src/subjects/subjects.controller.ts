import { Body, Controller, Get, Param, ParseBoolPipe, Post, Query, Request, UseGuards, UsePipes } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { Token } from 'src/users/auth/token.entity';
import { CreateSubjectDTO } from './dto/create-subject.dto';
import { EnrollStudentDTO } from './dto/enroll-student.dto';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
export class SubjectsController {
    constructor(private service: SubjectsService) {}
    
    @UseGuards(AuthGuard)
    @UsePipes(ParseBoolPipe)
    @Get('/')
    async findAll(
        @Query('enrolled') enrolled: boolean,
        @Request() req: ExpressRequest
    ) {

        const userToken: Token = req['auth']
        const userId = userToken.user.id
        console.log(userToken)
        if (enrolled) {
            const result = await this.service.findEnrolledSubjects(userId)
            return result
        }
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
        const result = this.service.enroll(body)
        return result
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    async findOne(@Param('id') id: string) {
        return this.service.findOne(id)
    }
}
