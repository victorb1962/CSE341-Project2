const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Vics CSE341 Portfolio - Project 2',
    description: 'Artwork & Art Curator APIs'
  },

  // host: 'localhost:8080', // enable for local
  host: 'victor-341w05.onrender.com', // enable for production
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });
