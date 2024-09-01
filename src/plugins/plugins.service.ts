import { HttpException, Injectable } from '@nestjs/common';
import { CreatePluginDto } from './dto/create-plugin.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PluginsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPluginDto: CreatePluginDto) {
    try {
      const plugin = await this.prismaService.plugin.create({
        data: {
          name: createPluginDto.name,
          description: createPluginDto.description,
          imagePath: createPluginDto.imagePath,
          url: createPluginDto.pluginUrl,
          version: createPluginDto.version,
        },
      });
      const { id, ...pluginWithoutId } = plugin;
      return {
        message: 'Plugin created successfully',
        pluginWithoutId,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException('Error creating plugin', 400, {
        description: error,
      });
    }
  }

  async findAll(query: any) {
    try {
      const filters = query;
      const plugins = await this.prismaService.plugin.findMany({
        where: {
          OR: [
            { name: { contains: filters.input || '' } },
            { description: { contains: filters.input } },
            { version: { contains: filters.version } },
          ],
        },
        take: filters.limit || 10,
        skip: filters.offset || 0,
      });
      return {
        message: 'Plugins found successfully',
        plugins,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException('Error finding plugins', 400, {
        description: error,
      });
    }
  }

  async findOne(id: string) {
    try {
      const plugin = await this.prismaService.plugin.findUnique({
        where: {
          id,
        },
      });
      return {
        message: 'Plugin found successfully',
        plugin,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException('Error finding plugin', 400, {
        description: error,
      });
    }
  }

  async remove(id: string) {
    try {
      const pluginDeleted = await this.prismaService.plugin.delete({
        where: {
          id,
        },
      });
      return {
        message: 'Plugin deleted successfully',
        pluginDeleted,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException('Error deleting plugin', 400, {
        description: error,
      });
    }
  }
  async findPluginsByIds(ids: string[]) {
    try {
      const plugins = await this.prismaService.plugin.findMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
      return {
        message: 'Plugins found successfully',
        plugins,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException('Error finding plugins', 400, {
        description: error,
      });
    }
  }
}

