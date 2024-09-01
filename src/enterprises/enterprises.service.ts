import { Injectable } from '@nestjs/common';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EnterprisesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createEnterpriseDto: CreateEnterpriseDto) {
    const enterprise = await this.prismaService.enterprise.create({
      data: createEnterpriseDto,
    });
    return {
      message: 'Created with success',
      enterprise,
    };
  }

  async findAll() {
    const enterprises = await this.prismaService.enterprise.findMany();
    return {
      message: 'All enterprises',
      enterprises,
    };
  }

  async findOne(id: string) {
    const enterprise = await this.prismaService.enterprise.findUnique({
      where: {
        id,
      },
    });
    return {
      message: 'Enterprise found',
      enterprise,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} enterprise`;
  }
}
