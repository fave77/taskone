const { Router } = require('express');
const taskRouter = Router();
const { createTask, updateTask, deleteTask, listTask } = require('../handlers/task.handler');

/**
 * @swagger
 * components:
 *   schemas:
 *     TaskReq:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *           example: '74967f6b-b752-4085-bb01-9a19f05d1be7'
 *         title:
 *           type: string
 *           example: 'Lorem Ipsum'
 *         description:
 *           type: string
 *           example: 'dolor sit amet, consectetur adipiscing elit'
 *         dueDate:
 *           type: string
 *           format: date
 *           example: '2024-06-15'
 *         priority:
 *           type: string
 *           enum: ['LOW', 'MEDIUM', 'HIGH']
 *           example: 'LOW'
 *         status:
 *           type: string
 *           enum: ['INCOMPLETE', 'COMPLETE', 'CANCELLED']
 *           example: 'INCOMPLETE'
 *         notification:
 *           type: boolean
 *           example: false
 *         recurring:
 *           type: object
 *           properties:
 *             interval:
 *               type: integer
 *               example: 36000
 *             nextOccurrence:
 *               type: integer
 *               example: 1719259317
 *
 *     TaskResp:
 *       type: object
 *       properties:
 *         taskId:
 *           type: string
 *           format: uuid
 *           example: 'fd938d0b-cad2-4c2f-bc5c-5705bb2edc3f'
 *         userId:
 *           type: string
 *           format: uuid
 *           example: '74967f6b-b752-4085-bb01-9a19f05d1be7'
 *         title:
 *           type: string
 *           example: 'Lorem Ipsum'
 *         description:
 *           type: string
 *           example: 'dolor sit amet, consectetur adipiscing elit'
 *         dueDate:
 *           type: string
 *           format: date
 *           example: '2024-06-15'
 *         priority:
 *           type: string
 *           enum: ['LOW', 'MEDIUM', 'HIGH']
 *           example: 'LOW'
 *         status:
 *           type: string
 *           enum: ['INCOMPLETE', 'COMPLETE', 'CANCELLED']
 *           example: 'INCOMPLETE'
 *         notification:
 *           type: boolean
 *           example: false
 *         recurring:
 *           type: object
 *           properties:
 *             interval:
 *               type: integer
 *               example: 36000
 *             nextOccurrence:
 *               type: integer
 *               example: 1719259317
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
 *             $ref: '#/components/schemas/TaskReq'
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
taskRouter.post('/create-task', createTask);

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
 *             $ref: '#/components/schemas/TaskReq'
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
taskRouter.post('/update-task', updateTask);

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
taskRouter.post('/delete-task', deleteTask);

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
 *               taskId:
 *                 type: string
 *                 format: uuid
 *                 example: 'fd938d0b-cad2-4c2f-bc5c-5705bb2edc3f'
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 example: '74967f6b-b752-4085-bb01-9a19f05d1be7'
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
taskRouter.post('/list-all-task', listTask);

module.exports = taskRouter;