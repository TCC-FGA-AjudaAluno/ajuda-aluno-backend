import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query, Request, Response, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { UploadFileDTO } from './dto/upload-file.dto';
import { MaterialsService } from './materials.service';
import { AuthenticatedRequest } from 'src/users/auth/@types/authenticated-request';
import { Response as ExpressResponse } from 'express';
import * as path from 'path'

@Controller('materials')
export class MaterialsController {
    constructor (private service: MaterialsService) {}

    @Post('/')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file', {
        dest: 'uploads'
    }))
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: UploadFileDTO,
        @Request() req: AuthenticatedRequest
    ) {
        const user = req.auth.user
        return this.service.createFile(body, user, file)
    }

    @Get('/')
    @UseGuards(AuthGuard)
    async index(@Query('subjectId') subjectId: string) {
        return this.service.findAll(subjectId)
    }

    @Get('/:materialId')
    async showFile(@Param('materialId') materialId: string, @Response() res: ExpressResponse) {
        const material = await this.service.findOne(materialId)
        res.setHeader('Content-Type', material.mimetype)
        res.sendFile(path.resolve(material.path))
    }

    @Delete('/:materialId')
    @UseGuards(AuthGuard)
    @HttpCode(204)
    async deleteItem(@Param('materialId') materialId: string) {
        await this.service.remove(materialId)
        return
    }
}
