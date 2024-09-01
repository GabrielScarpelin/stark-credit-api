import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { PredictionsService } from './predictions.service';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('predictions')
export class PredictionsController {
  constructor(private readonly predictionsService: PredictionsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  public async newPrediction(
    @Body() createPredictionDto: CreatePredictionDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.predictionsService.create(createPredictionDto, files);
  }

  @Get()
  public async getPredictions() {
    return this.predictionsService.findAll();
  }

  @Get(':id')
  public async getPrediction(@Param('id') id: string) {
    return this.predictionsService.findOne(+id);
  }

  @Get('enterprise/:enterpriseId')
  public async getPredictionsByEnterprise(
    @Param('enterpriseId') enterpriseId: string,
  ) {
    return this.predictionsService.findByEnterprise(+enterpriseId);
  }
}

