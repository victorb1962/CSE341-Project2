const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swaggerDesign.json'); // use custom json
// const swaggerDocument = require('../swagger.json');    // use generated json - npm run swagger
router.use('/api-docs', swaggerUi.serve);
router.use(
  '/api-docs',
  swaggerUi.setup(swaggerDocument, {
    explorer: true
  })
);

module.exports = router;
