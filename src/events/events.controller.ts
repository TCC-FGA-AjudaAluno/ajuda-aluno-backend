import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, HttpCode, UnprocessableEntityException } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { AuthUser } from 'src/users/auth/auth.decorator';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Controller('events')
@UseGuards(AuthGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService, private userService: UsersService) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto, @AuthUser() user: User) {
    this.userService.updatePoints(user, 18)
    return this.eventsService.create(createEventDto, user.id);
  }

  @Get()
  findAll(@Query('subjectId') subjectId: string) {
    if (!subjectId) {
      console.error("Subject was not provided!")
      throw new UnprocessableEntityException('Missing `subjectId` query parameter.')
    }
    return this.eventsService.findAll(subjectId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log("Searching an event")
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
