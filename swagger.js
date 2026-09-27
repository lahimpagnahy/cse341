import swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CSE 341 Books and Authors API',
      version: '1.0.0',
      description: 'Books and Authors Web Service for CSE 341 Week 02'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./src/router.js']
};

const swaggerSpec = swaggerJsdoc(options);

fs.writeFileSync(
  './swagger.json',
  JSON.stringify(swaggerSpec, null, 2)
);

console.log('swagger.json generated successfully.');
