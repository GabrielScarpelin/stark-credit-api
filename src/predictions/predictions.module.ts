import { Module } from '@nestjs/common';
import { PredictionsService } from './predictions.service';
import { PredictionsController } from './predictions.controller';
import { PythonModelProcessService } from 'src/python-model-process/python-model-process.service';
import { SocketService } from 'src/socket/socket.service';
import { SocketGateway } from 'src/socket/socket.gateway';

@Module({
  imports: [],
  controllers: [PredictionsController],
  providers: [
    PredictionsService,
    PythonModelProcessService,
    SocketGateway,
    SocketService,
  ],
})
export class PredictionsModule {}
