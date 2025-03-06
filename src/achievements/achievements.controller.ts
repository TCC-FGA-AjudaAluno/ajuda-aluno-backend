import { Controller, Get, UseGuards } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { AuthUser } from 'src/users/auth/auth.decorator';
import { User } from 'src/users/user.entity';

@Controller('achievements')
export class AchievementsController {
    constructor(private service: AchievementsService) {}

    @Get()
    @UseGuards(AuthGuard)
    async findAll(@AuthUser() user: User) {
        if (user && user.id) {
            return this.service.findAll(user.id)
        }
        return this.service.findAll()
    }
}
