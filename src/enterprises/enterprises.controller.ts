import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EnterprisesService } from './enterprises.service';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';

@Controller('enterprises')
export class EnterprisesController {
  constructor(private readonly enterprisesService: EnterprisesService) {}

  @Post()
  async create(@Body() createEnterpriseDto: CreateEnterpriseDto) {
    return await this.enterprisesService.create(createEnterpriseDto);
  }

  @Get()
  async findAll() {
    return await this.enterprisesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enterprisesService.findOne(id);
  }
}
