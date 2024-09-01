import { Injectable } from '@nestjs/common';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { PythonModelProcessService } from 'src/python-model-process/python-model-process.service';
import { SocketService } from 'src/socket/socket.service';
import { SocketGateway } from 'src/socket/socket.gateway';
import { PluginsService } from 'src/plugins/plugins.service';

const CREDENTIALS = {};
@Injectable()
export class PredictionsService {
  constructor(
    private readonly pythonModelProcessService: PythonModelProcessService,
    private readonly socketGetaway: SocketGateway,
    private readonly pluginsService: PluginsService,
  ) {}

  async create(
    createPredictionDto: CreatePredictionDto,
    files: Array<Express.Multer.File>,
  ) {
    const plugins = await this.pluginsService.findPluginsByIds(
      createPredictionDto.pluginsIds,
    );
    return await this.pythonModelProcessService.runPythonModelProcess(
      plugins as any,
    );
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

