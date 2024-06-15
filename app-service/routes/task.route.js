const { Router } = require('express');
const taskRouter = Router();
const ROUTES = require('../constants/route.constant');
const { createTask, updateTask, deleteTask, listTask } = require('../handlers/task.handler');

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateTaskReq:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           example: 'johndoe713612'
 *         title:
 *           type: string
 *           example: 'Lorem Ipsum'
 *         description:
 *           type: string
 *           example: 'dolor sit amet, consectetur adipiscing elit'
 *         dueDate:
 *           type: string
 *           format: date
 *           example: '2024-06-15T23:16:14.000Z'
 *         priority:
 *           type: string
 *           enum: ['LOW', 'MEDIUM', 'HIGH']
 *           example: 'LOW'
 *         status:
 *           type: string
 *           enum: ['INCOMPLETE', 'COMPLETE', 'CANCELLED']
 *           example: 'INCOMPLETE'
 *         reminder:
 *           type: string
 *           example: '0 0 * * *'
 *         recurrence:
 *           type: string
 *           example: '0 0 * * *'
 * 
 *     UpdateTaskReq:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           example: 'johndoe713612'
 *         taskId:
 *           type: string
 *           format: uuid
 *           example: 'fd938d0b-cad2-4c2f-bc5c-5705bb2edc3f'
 *         title:
 *           type: string
 *           example: 'Lorem Ipsum'
 *         description:
 *           type: string
 *           example: 'dolor sit amet, consectetur adipiscing elit'
 *         dueDate:
 *           type: string
 *           format: date
 *           example: '2024-06-15T23:16:14.000Z'
 *         priority:
 *           type: string
 *           enum: ['LOW', 'MEDIUM', 'HIGH']
 *           example: 'LOW'
 *         status:
 *           type: string
 *           enum: ['INCOMPLETE', 'COMPLETE', 'CANCELLED']
 *           example: 'INCOMPLETE'
 *         reminder:
 *           type: string
 *           example: '0 0 * * *'
 *         recurrence:
 *           type: string
 *           example: '0 0 * * *'
 * 
 *
 *     TaskResp:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: '666ddbed1728896abc0a3f04'
 *         __v:
 *           type: integer
 *           example: 0
 *         taskId:
 *           type: string
 *           format: uuid
 *           example: 'fd938d0b-cad2-4c2f-bc5c-5705bb2edc3f'
 *         userId:
 *           type: string
 *           example: 'johndoe713612'
 *         title:
 *           type: string
 *           example: 'Lorem Ipsum'
 *         description:
 *           type: string
 *           example: 'dolor sit amet, consectetur adipiscing elit'
 *         createdAt:
 *           type: string
 *           format: date
 *           example: '2024-06-15T23:16:14.000Z'
 *         updatedAt:
 *           type: string
 *           format: date
 *           example: '2024-06-15T23:16:14.000Z'
 *         dueDate:
 *           type: string
 *           format: date
 *           example: '2024-06-15T23:16:14.000Z'
 *         priority:
 *           type: string
 *           enum: ['LOW', 'MEDIUM', 'HIGH']
 *           example: 'LOW'
 *         status:
 *           type: string
 *           enum: ['INCOMPLETE', 'COMPLETE', 'CANCELLED']
 *           example: 'INCOMPLETE'
 *         reminder:
 *           type: string
 *           example: '0 0 * * *'
 *         recurrence:
 *           type: string
 *           example: '0 0 * * *'
 */

/**
 * @swagger
 * /api/create-task:
 *   post:
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTaskReq'
 *     responses:
 *       200:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/TaskResp'
 */
taskRouter.post(ROUTES.CREATE_TASK, createTask);

/**
 * @swagger
 * /api/update-task:
 *   post:
 *     summary: Update an existing task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTaskReq'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/TaskResp'
 */
taskRouter.post(ROUTES.UPADTE_TASK, updateTask);

/**
 * @swagger
 * /api/delete-task:
 *   post:
 *     summary: Delete an existing task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: string
 *                 format: uuid
 *                 example: 'fd938d0b-cad2-4c2f-bc5c-5705bb2edc3f'
 *               userId:
 *                 type: string
 *                 example: 'johndoe713612'
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 */
taskRouter.post(ROUTES.DELETE_TASK, deleteTask);

/**
 * @swagger
 * /api/list-all-task:
 *   post:
 *     summary: List all the tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 'johndoe713612'
 *     responses:
 *       200:
 *         description: Tasks listed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items: 
 *                     $ref: '#/components/schemas/TaskResp'
 *                   
 */
taskRouter.post(ROUTES.LIST_ALL_TASK, listTask);

module.exports = taskRouter;