import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, ValidationPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport'; 

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllTasks(): Promise<Task[]> {
    return await this.tasksService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return await this.tasksService.getTaskById(+id);
  }

  @Post(':userId')
  @HttpCode(HttpStatus.CREATED)
  async createTask(
    @Param('userId') userId: string,
    @Body(ValidationPipe) createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return await this.tasksService.createTask(createTaskDto.title, createTaskDto.description, +userId);
  }

  @Get('user/:userId')
  async getTasksByUserId(@Param('userId') userId: string): Promise<Task[]> {
    return await this.tasksService.getTasksByUserId(+userId);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body(ValidationPipe) updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return await this.tasksService.updateTask(+id, updateTaskDto.title, updateTaskDto.description, updateTaskDto.completed);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTask(@Param('id') id: string): Promise<void> {
    await this.tasksService.deleteTask(+id);
  }
}