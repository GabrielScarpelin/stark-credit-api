import { Injectable } from '@nestjs/common';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { PythonModelProcessService } from 'src/python-model-process/python-model-process.service';
import { SocketService } from 'src/socket/socket.service';
import { SocketGateway } from 'src/socket/socket.gateway';

@Injectable()
export class PredictionsService {
  constructor(
    private readonly pythonModelProcessService: PythonModelProcessService,
    private readonly socketGetaway: SocketGateway,
  ) {}

  async create(
    createPredictionDto: CreatePredictionDto,
    files: Array<Express.Multer.File>,
  ) {
    console.log(files);
    createPredictionDto;
    this.pythonModelProcessService
      .runPythonModelProcess()
      .then((data) => {
        this.socketGetaway.emitMessage(
          'aiFinished',
          'python',
          createPredictionDto.socketId,
        );
        console.log('DATA: ', data);
        console.log('Data from Python model process');
      })
      .catch((error) => {
        console.log(error);
        console.log('Error from Python model process');
      });
    return {
      message: 'Prediction created',
    };
  }

  findAll() {
    return `This action returns all predictions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prediction`;
  }

  findByEnterprise(enterpriseId: number) {
    return `This action returns all predictions from enterprise #${enterpriseId}`;
  }
}

