import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EntityManager } from 'typeorm';
import { EventEntity } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(private em: EntityManager) {}

  async create(data: CreateEventDto, userId: string) {
    const event = this.em.create(EventEntity, {
      start: data.start,
      end: data.end,
      description: data.description ?? null,
      location: data.location,
      title: data.title,
      subjectId: data.subjectId,
      userId: userId
    })

    await this.em.save(event)
    return event
  }

  async findAll(subjectId: string) {
    return this.em.find(EventEntity, {where:{subjectId}, order:{start: 'ASC'}})
  }

  async findOne(id: string) {
    const event = await this.em.findOne(EventEntity, {where: {id}})
    console.log(event)
    if (!event) {
      console.log("Não tava aqui")
      throw new NotFoundException('Event not found')
    }

    return event
  }

  async update(id: string, data: UpdateEventDto) {
    delete data.subjectId
    await this.em.update(EventEntity, id, data)
    const event = await this.findOne(id)

    return event
  }

  async remove(id: string) {
    const event = await this.findOne(id) 
    return this.em.remove(event)
  }
}
