import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true }) 
export class AchievementsGateway {
  @WebSocketServer()
  server: Server;

  // Simular envio de achievements periodicamente
  private simulateAchievementUnlock() {
    setInterval(() => {
      const newAchievement = {
        //id: Math.floor(Math.random() * 1000),
        id: 1,
        title: "Novo Achievement 🎉",
        description: "Você desbloqueou um novo desafio!",
      };
      console.log("Enviando achievement:", newAchievement);
      this.server.emit('achievementUnlocked', newAchievement); // Enviar para todos os clientes conectados
    }, 10000);
  }

  constructor() {
    this.simulateAchievementUnlock();
  }

  // Método para disparar achievement manualmente (pode ser chamado por outros serviços)
  sendAchievement(achievement: any) {
    this.server.emit('achievementUnlocked', achievement);
  }

  // Permitir que o cliente envie mensagens
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string) {
    console.log('Mensagem recebida:', message);
    return { message: 'Mensagem recebida pelo servidor!' };
  }
}
