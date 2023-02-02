import { Task } from './tasks.entity';
import { AppDataSource } from '../../index';
import {
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UpdateResult } from 'typeorm';

class TasksController {
  public async getAll(
    req: Request,
    res: Response,
  ): Promise<Response> {
    let allTasks: Task[];

    try {
      allTasks = await AppDataSource.getRepository(
        Task,
      ).find({
        order: {
          date: 'ASC',
        },
      });
      allTasks = instanceToPlain(allTasks) as Task[];
      return res.json(allTasks).status(200);
    } catch (_err) {
      return res
        .status(500)
        .json({ message: 'Internal server error' });
    }
  }

  public async create(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    const newTask = new Task();
    newTask.title = req.body.title;
    newTask.date = req.body.date;
    newTask.description = req.body.description;
    newTask.status = req.body.status;
    newTask.priority = req.body.priority;

    let createdTask: Task;

    try {
      createdTask = await AppDataSource.getRepository(
        Task,
      ).save(newTask);
      createdTask = instanceToPlain(createdTask) as Task;
      return res.json(createdTask).status(201);
    } catch (_err) {
      return res
        .status(500)
        .json({ message: 'Internal server error' });
    }
  }

  public async update(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    let task: Task | null;

    try {
      task = await AppDataSource.getRepository(
        Task,
      ).findOne({
        where: { id: req.body.id },
      });
    } catch (_err) {
      return res
        .status(500)
        .json({ message: 'Internal server error2' });
    }

    if (!task) {
      return res
        .status(404)
        .json({ message: 'Task not found' });
    }

    let updatedTask: UpdateResult;
    try {
      updatedTask = await AppDataSource.getRepository(
        Task,
      ).update(
        req.body.id,
        plainToInstance(Task, {
          status: req.body.status,
        }),
      );
      updatedTask = instanceToPlain(
        updatedTask,
      ) as UpdateResult;
      return res.json(updatedTask).status(200);
    } catch (_err) {
      return res
        .status(500)
        .json({ message: 'Internal server error3' });
    }
  }
}

export const tasksController = new TasksController();
