const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Taskone Api Specs',
    version: '1.0.0',
    description: 'These APIs are responsible for handling all the user journey.',
  },
};

const options = {
  swaggerDefinition,
  apis: [`${__dirname}/../routes/*.route.js`], // Path to the API routes 
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;