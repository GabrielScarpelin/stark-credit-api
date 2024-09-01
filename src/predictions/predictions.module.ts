import { Module } from '@nestjs/common';
import { PredictionsService } from './predictions.service';
import { PredictionsController } from './predictions.controller';
import { PythonModelProcessService } from 'src/python-model-process/python-model-process.service';
import { SocketService } from 'src/socket/socket.service';
import { SocketGateway } from 'src/socket/socket.gateway';
import { PluginsService } from 'src/plugins/plugins.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [PredictionsController],
  providers: [
    PredictionsService,
    PythonModelProcessService,
    SocketGateway,
    SocketService,
    PluginsService,
    PrismaService,
  ],
})
export class PredictionsModule {}
