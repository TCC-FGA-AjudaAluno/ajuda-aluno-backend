import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { CreateInfoDTO } from './dto/create-info.dto';
import { Info } from './infos.entity';

@Injectable()
export class InfosService {
    private readonly logger = new Logger(InfosService.name)

    constructor(private manager: EntityManager) { }

    async create(data: CreateInfoDTO) {
        this.logger.log('Creating new info in database')
        const info = await this.manager.save(Info, {
            title: data.title,
            content: data.content,
            author: {
                id: data.author_id ?? null
            }
        })

        return info
    }

    async findAll() {
        const [data, count] = await this.manager.findAndCount(Info, {
            relations: ['author'],
            select: {
                author: {
                    id: true,
                    points: false,
                    rank: false
                }
            }
        })
        this.logger.log(`Found ${count} items`)
        return data
    }

    async findOneById(infoId: string) {
        const info = await this.manager.findOne(Info, {
            where: {
                id: infoId
            },
            relations: ['author'],
            select: {
                author: {
                    id: true
                }
            }
        })

        if (!info) throw new NotFoundException(`Info with id ${infoId} not found.`);

        return info
    }
}
