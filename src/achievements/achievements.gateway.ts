import { OnEvent } from '@nestjs/event-emitter';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Achievement } from './entities/achievement.entity';

@WebSocketGateway({ cors: true }) 
export class AchievementsGateway {
  @WebSocketServer()
  server: Server;

  constructor() {
    // this.simulateAchievementUnlock();
  }

  // Método para disparar achievement manualmente (pode ser chamado por outros serviços)
  @OnEvent('achievement.unlocked')
  sendAchievement(achievement: Achievement) {
    this.server.emit('achievementUnlocked', achievement);
  }

  // Permitir que o cliente envie mensagens
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string) {
    console.log('Mensagem recebida:', message);
    return { message: 'Mensagem recebida pelo servidor!' };
  }
}
