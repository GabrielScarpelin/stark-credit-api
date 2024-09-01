import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PluginsService } from './plugins.service';
import { CreatePluginDto } from './dto/create-plugin.dto';
import { PrismaService } from 'src/prisma.service';

@Controller('plugins')
export class PluginsController {
  constructor(
    private readonly pluginsService: PluginsService,
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  create(@Body() createPluginDto: CreatePluginDto) {
    return this.pluginsService.create(createPluginDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.pluginsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pluginsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pluginsService.remove(id);
  }
}

