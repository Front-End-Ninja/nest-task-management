import {Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {Task} from "./task.entity";
import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskStatusDto} from "./dto/update-task-status.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {AuthGuard} from "@nestjs/passport";
import {User} from "../auth/user.entity";
import {GetUser} from "../auth/get-user.decorator";


@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) {
    }

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User,
    ): Promise<Task> {
        return this.tasksService.createTask(createTaskDto, user);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): Promise<void> {
        return this.tasksService.deleteTaskById(id)
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body() updateTaskStatus: UpdateTaskStatusDto,
    ): Promise<Task> {
        const {status} = updateTaskStatus;
        return this.tasksService.updateTaskStatus(id, status)
    }
}
