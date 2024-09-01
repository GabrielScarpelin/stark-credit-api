import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PythonModelProcessService } from './python-model-process/python-model-process.service';
import { PredictionsModule } from './predictions/predictions.module';
import { PluginsModule } from './plugins/plugins.module';
import { PrismaService } from './prisma.service';
import { SocketGateway } from './socket/socket.gateway';
import { SocketService } from './socket/socket.service';
import { SocketModule } from './socket/socket.module';
import { EnterprisesModule } from './enterprises/enterprises.module';

@Module({
  imports: [PredictionsModule, PluginsModule, SocketModule, EnterprisesModule],
  controllers: [AppController],
  providers: [AppService, PythonModelProcessService, PrismaService],
})
export class AppModule {}

