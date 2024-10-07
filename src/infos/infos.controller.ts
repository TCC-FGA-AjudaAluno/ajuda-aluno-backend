import { Body, Controller, Get, Param, Post, Req, UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { CreateInfoDTO } from './dto/create-info.dto';
import { InfosService } from './infos.service';
import { AuthenticatedRequest } from 'src/users/auth/@types/authenticated-request';

@UseGuards(AuthGuard)
@Controller('infos')
export class InfosController {
    constructor(private service: InfosService) { }

    @Post()
    async create(
        @Body() body: CreateInfoDTO,
        @Req() req: AuthenticatedRequest
    ) {
        if (!body.title || !body.content) throw new UnprocessableEntityException();
        if (!body.author_id) {
            body.author_id = req.auth.user.id
        }
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
