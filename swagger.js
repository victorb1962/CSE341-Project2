const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Vics CSE341 Portfolio - Project 2',
    description: 'Artwork & Art Curator APIs'
  },

  host: 'localhost:3000', // enable for local with 'http'
  // host: 'victor-341w05.onrender.com', // enable for production with 'https'
  schemes: ['http']
};

const outputFile = './swagger.json';          // to generated json - npm run swagger
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });
