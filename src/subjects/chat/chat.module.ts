import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

@Module({
  controllers: [ChatController], // Define o controlador para este módulo
  providers: [ChatService], // Define o serviço para este módulo
})
export class ChatModule { }
