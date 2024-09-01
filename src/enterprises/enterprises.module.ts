import { Module } from '@nestjs/common';
import { EnterprisesService } from './enterprises.service';
import { EnterprisesController } from './enterprises.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [EnterprisesController],
  providers: [EnterprisesService, PrismaService],
})
export class EnterprisesModule {}
