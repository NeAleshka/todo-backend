import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TasksService {
  constructor(private prism: PrismaService) {}

  async create(title: string, userId: number) {
    return this.prism.task.create({
      data: { title: title.trim(), userId },
    });
  }

  findAll() {
    return this.prism.task.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<Task | null> {
    const foundTask = await this.prism.task.findUnique({
      where: { id },
    });
    if (foundTask) {
      return { ...foundTask, id: foundTask?.id.toString() };
    } else return null;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const foundedTask = await this.prism.task.findUnique({ where: { id } });

    if (foundedTask) {
      await this.prism.task.update({
        where: { id },
        data: { title: updateTaskDto.title },
      });
    } else throw new NotFoundException(`не нашлось таски с таким c id ${id}`);
  }

  remove(id: number) {
    return this.prism.task.delete({ where: { id } });
  }
}
