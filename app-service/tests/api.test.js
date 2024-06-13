const request = require('supertest');
const ROUTES = require('../constants/route.constant');
const port = process.env.APP_PORT || 8080;

/*
 * routeToPayloadMap maps each route to a payload i.e. request and response
 */
const routeToPayloadMap = {
  [ROUTES.CREATE_TASK]: {
    request: {
      userId: 'johndoe713612',
      title: 'Lorem Ipsum',
      description: 'dolor sit amet, consectetur adipiscing elit',
      dueDate: '2024-06-15',
      priority: 'LOW',
      status: 'INCOMPLETE',
    },
    response: {
      success: true,
      data: {
        userId: 'johndoe713612',
        taskId: '',
        description: 'dolor sit amet, consectetur adipiscing elit',
        dueDate: '2024-06-15T00:00:00.000Z',
        priority: 'LOW',
        status: 'INCOMPLETE',
        title: 'Lorem Ipsum'
      }
    },
  },
  [ROUTES.UPADTE_TASK]: {
    request: {
      userId: 'johndoe713612',
      taskId: '',
      title: 'Lorem Ipsum',
      description: 'dolor sit amet, consectetur adipiscing elit',
      dueDate: '2024-06-15',
      priority: 'LOW',
      status: 'INCOMPLETE',
    },
    response: {
      success: true,
      data: {
        taskId: 'fd938d0b-cad2-4c2f-bc5c-5705bb2edc3f',
        userId: 'johndoe713612',
        description: 'dolor sit amet, consectetur adipiscing elit',
        dueDate: '2024-06-15T00:00:00.000Z',
        priority: 'LOW',
        status: 'INCOMPLETE',
        title: 'Lorem Ipsum'
      }
    },
  },
  [ROUTES.DELETE_TASK]: {
    request: {
      userId: 'johndoe713612',
      taskId: ''
    },
    response: {
      success: true
    },
  },
  [ROUTES.LIST_ALL_TASK]: {
    request: {
      userId: 'johndoe713612'
    },
    response: {
      success: true,
      data: []
    },
  },  
  [ROUTES.ACCESS_USER]: {
    request: {
      userId: 'johndoe713612'
    },
    response: {
      success: true,
      data: {
        userId: 'johndoe713612'
      }
    }
  },
  [ROUTES.DELETE_USER]: {
    request: {
      userId: 'johndoe713612'
    },
    response: {
      success: true
    },
  },
};

describe('Taskone API Integration Tests', () => {
  const createTaskRoute = `/api${ROUTES.CREATE_TASK}`;
  const createTaskRequest = routeToPayloadMap[ROUTES.CREATE_TASK].request;
  const exepectedCreateTaskResponse = routeToPayloadMap[ROUTES.CREATE_TASK].response;

  it(`POST ${createTaskRoute}`, async () => {
    const actualCreateTaskResponse = await request(`http://localhost:${port}`)
      .post(createTaskRoute)
      .send(createTaskRequest)
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8');

    expect(actualCreateTaskResponse.status).toBe(200);
    expect(actualCreateTaskResponse.body).toHaveProperty('success', exepectedCreateTaskResponse.success);
  });

  
  const updateTaskRoute = `/api${ROUTES.UPADTE_TASK}`;
  const updateTaskRequest = routeToPayloadMap[ROUTES.UPADTE_TASK].request;
  const exepectedUpdateTaskResponse = routeToPayloadMap[ROUTES.UPADTE_TASK].response;

  it(`POST ${updateTaskRoute}`, async () => {
    const actualCreateTaskResponse = await request(`http://localhost:${port}`)
      .post(createTaskRoute)
      .send(createTaskRequest)
      .set('Accept', 'application/json');

    const actualUpdateTaskResponse = await request(`http://localhost:${port}`)
      .post(updateTaskRoute)
      .send({ ...updateTaskRequest, taskId: actualCreateTaskResponse.taskId })
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8');

    expect(actualUpdateTaskResponse.status).toBe(200);
    expect(actualUpdateTaskResponse.body).toHaveProperty('success', exepectedUpdateTaskResponse.success);
  });


  const deleteTaskRoute = `/api${ROUTES.DELETE_TASK}`;
  const deleteTaskRequest = routeToPayloadMap[ROUTES.DELETE_TASK].request;
  const exepectedDeleteTaskResponse = routeToPayloadMap[ROUTES.DELETE_TASK].response;

  it(`POST ${deleteTaskRoute}`, async () => {
    const actualCreateTaskResponse = await request(`http://localhost:${port}`)
    .post(createTaskRoute)
    .send(createTaskRequest)
    .set('Accept', 'application/json');
    
    const actualDeleteTaskResponse = await request(`http://localhost:${port}`)
      .post(deleteTaskRoute)
      .send({ ...deleteTaskRequest, taskId: actualCreateTaskResponse.taskId })
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8');

    expect(actualDeleteTaskResponse.status).toBe(200);
    expect(actualDeleteTaskResponse.body).toHaveProperty('success', exepectedDeleteTaskResponse.success);
  });


  const listAllTaskRoute = `/api${ROUTES.LIST_ALL_TASK}`;
  const listAllTaskRequest = routeToPayloadMap[ROUTES.LIST_ALL_TASK].request;
  const exepectedListAllTaskResponse = routeToPayloadMap[ROUTES.LIST_ALL_TASK].response;

  it(`POST ${listAllTaskRoute}`, async () => {
    const actualListAllTaskResponse = await request(`http://localhost:${port}`)
      .post(listAllTaskRoute)
      .send(listAllTaskRequest)
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8');

    expect(actualListAllTaskResponse.status).toBe(200);
    expect(actualListAllTaskResponse.body).toHaveProperty('success', exepectedListAllTaskResponse.success);
  });


  const accessUserRoute = `/api${ROUTES.ACCESS_USER}`;
  const accessUserRequest = routeToPayloadMap[ROUTES.ACCESS_USER].request;
  const exepectedAccessUserResponse = routeToPayloadMap[ROUTES.ACCESS_USER].response;

  it(`POST ${accessUserRoute}`, async () => {
    const actualAccessUserResponse = await request(`http://localhost:${port}`)
      .post(accessUserRoute)
      .send(accessUserRequest)
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8');

    expect(actualAccessUserResponse.status).toBe(200);
    expect(actualAccessUserResponse.body).toHaveProperty('success', exepectedAccessUserResponse.success);
  });


  const deleteUserRoute = `/api${ROUTES.DELETE_USER}`;
  const deleteUserRequest = routeToPayloadMap[ROUTES.DELETE_USER].request;
  const exepectedDeleteUserResponse = routeToPayloadMap[ROUTES.DELETE_USER].response;

  it(`POST ${deleteUserRoute}`, async () => {
    const actualDeleteUserResponse = await request(`http://localhost:${port}`)
      .post(deleteUserRoute)
      .send(deleteUserRequest)
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8');

    expect(actualDeleteUserResponse.status).toBe(200);
    expect(actualDeleteUserResponse.body).toHaveProperty('success', exepectedDeleteUserResponse.success);
  });
});
