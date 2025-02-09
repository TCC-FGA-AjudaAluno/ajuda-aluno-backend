import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { EntityManager, TypeORMError } from 'typeorm';
import { UploadFileDTO } from './dto/upload-file.dto';
import { Material } from './materials.entity';

@Injectable()
export class MaterialsService {
    constructor(private em: EntityManager) { }

    async findAll(subjectId: string) {
        if (!subjectId) throw new UnprocessableEntityException('Missing subjectId.');


        const materials = await this.em.find(Material, {
            where: {
                subjectId
            },
            relations: ['author'],
            select: {
                author: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        })

        return materials;
    }

    async findOne(id: string) {
        const result = await this.em.findOne(Material, {
            where: {
                id
            }
        })

        if (!result) {
            throw new NotFoundException(`Could not find material with id: ${id}`)
        }

        return result
    }

    async remove(id: string) {
        return this.em.delete(Material, id)
    }

    async createFile(uploadFileDto: UploadFileDTO, user: User, file: Express.Multer.File) {
        try {
            const material = this.em.create(Material, {
                ...uploadFileDto,
                authorId: user.id,
                path: file.path,
                mimetype: file.mimetype
            })

            await this.em.save(Material, material)
            return material
        } catch (e) {
            if (e instanceof TypeORMError) {
                throw new UnprocessableEntityException(e)
            }
        }
    }
}
