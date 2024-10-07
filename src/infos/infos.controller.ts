import { Body, Controller, Get, Param, Post, UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { CreateInfoDTO } from './dto/create-info.dto';
import { InfosService } from './infos.service';

@UseGuards(AuthGuard)
@Controller('infos')
export class InfosController {
    constructor(private service: InfosService) { }

    @Post()
    async create(@Body() body: CreateInfoDTO) {
        console.log(body)
        if (!body.title || !body.content) throw new UnprocessableEntityException()
        return this.service.create(body)
    }

    @Get()
    async findAll() {
        return this.service.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') infoId: string) {
        return this.service.findOneById(infoId)
    }
}
