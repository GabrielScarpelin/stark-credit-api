import { Module } from '@nestjs/common';
import { PluginsService } from './plugins.service';
import { PluginsController } from './plugins.controller';
import { PythonModelProcessService } from 'src/python-model-process/python-model-process.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PluginsController],
  providers: [PluginsService, PythonModelProcessService, PrismaService],
})
export class PluginsModule {}
