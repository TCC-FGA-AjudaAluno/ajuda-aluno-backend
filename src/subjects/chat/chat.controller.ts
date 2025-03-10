import { Body, Controller, Post , UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from 'src/users/auth/auth.guard';

@Controller('chat')
export class ChatController {
  
  constructor(private readonly chatService: ChatService) {}

  @Post('message')
  async getChatMessage(@Body() body: { message: string }): Promise<{ message: string }> {
    const responseMessage = await this.chatService.getChatResponse(body.message);
    return { message: responseMessage };
  }
}
