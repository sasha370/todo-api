import { Priority } from './../enums/Priority';
import { body, ValidationChain } from 'express-validator';
import { Status } from '../enums/Status';

export const createValidator: ValidationChain[] = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('Title is required')
    .trim()
    .isString()
    .withMessage('Title must be a string'),

  body('date')
    .not()
    .isEmpty()
    .withMessage('Date is required')
    .trim()
    .isString()
    .withMessage('Date must be a string'),

  body('description')
    .trim()
    .isString()
    .withMessage('Description must be a string'),

  body('priority')
    .trim()
    .isIn([Priority.normal, Priority.high, Priority.low])
    .withMessage(
      'Priority must be one of the following: normal, high, low',
    ),

  body('status')
    .trim()
    .isIn([
      Status.todo,
      Status.inProgress,
      Status.completed,
    ])
    .withMessage(
      'Status must be one of the following: todo, inProgress, completed',
    ),
];

export const updateValidator: ValidationChain[] = [
  body('id')
    .not()
    .isEmpty()
    .withMessage('Id is required')
    .trim()
    .isString()
    .withMessage('Id must be a string'),

  body('status')
    .trim()
    .isIn([
      Status.todo,
      Status.inProgress,
      Status.completed,
    ])
    .withMessage(
      'Status must be one of the following: todo, inProgress, completed',
    ),
];
