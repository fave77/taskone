const { Router } = require('express');
const userRouter = Router();
const { accessUser, deleteUser } = require('../handlers/user.handler');

/**
 * @swagger
 * components:
 *   schemas:
 *     UserReq:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           example: 'johndoe'
 *
 *     UserResp:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           example: 'johndoe'
 */


/**
 * @swagger
 * /api/access-user:
 *   post:
 *     summary: Create a new user or fetch an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserReq'
 *     responses:
 *       200:
 *         description: User accessed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/UserResp'
 */
userRouter.post('/access-user', accessUser);

/**
 * @swagger
 * /api/delete-user:
 *   post:
 *     summary: Delete an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserReq'
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 */
userRouter.post('/delete-user', deleteUser);

module.exports = userRouter;