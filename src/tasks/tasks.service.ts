import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getTasksByUserId(userId: number): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }
  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find({ relations: ['user'] });
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async createTask(title: string, description: string | undefined, userId: number): Promise<Task> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const newTask = new Task();
    newTask.title = title;
    if (description) {
      newTask.description = description;
    }
    newTask.user = user;

    return await this.taskRepository.save(newTask);
  }

  async updateTask(id: number, title?: string, description?: string, completed?: boolean): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    if (title !== undefined) {
      task.title = title;
    }
    if (description !== undefined) {
      task.description = description;
    }
    if (completed !== undefined) {
      task.completed = completed;
    }
    return await this.taskRepository.save(task);
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}


// import { Injectable, NotFoundException } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';

// @Injectable()
// export class TasksService {
//   constructor(private prisma: PrismaService) {}

//   async getAllTasks() {
//     return await this.prisma.task.findMany({
//       include: { user: true },
//     });
//   }

//   async getTaskById(id: number) {
//     const task = await this.prisma.task.findUnique({
//       where: { id },
//       include: { user: true },
//     });
//     if (!task) {
//       throw new NotFoundException(`Task with ID ${id} not found`);
//     }
//     return task;
//   }

//   async createTask(title: string, description: string | undefined, userId: number) {
//     const userExists = await this.prisma.user.findUnique({ where: { id: userId }});
//     if (!userExists) {
//         throw new NotFoundException(`User with ID ${userId} not found`);
//     }

//     return await this.prisma.task.create({
//         data: {
//           title: title,
//           description: description,
//           user: {
//             connect: { id: userId },
//           },
//         },
//         include: { user: true },
//       });
//   }

//   async updateTask(id: number, title?: string, description?: string, completed?: boolean) {
//     await this.prisma.task.findUnique({
//       where: { id },
//     });

//     return await this.prisma.task.update({
//       where: { id },
//       data: {
//         title,
//         description,
//         completed,
//       },
//       include: { user: true },
//     });
//   }

//   async deleteTask(id: number) {
//     await this.prisma.task.delete({
//       where: { id },
//     });
//   }

//   async getTasksByUserId(userId: number) {
//      return await this.prisma.task.findMany({
//       where: { userId },
//       include: { user: true },
//     });
//   }
// }