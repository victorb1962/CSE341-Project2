const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Vics CSE341 Portfolio - Project 2',
    description: 'Artwork & Art Curator APIs'
  },

  // host: 'localhost:3000', // enable for local with 'http'
  host: 'victor-341w05.onrender.com', // enable for production with 'https'
  schemes: ['https']
};

// const outputFile = './swagger.json';    // use generated json - npm run swagger
const outputFile = './swaggerDesign.json'; // use custom json
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });
