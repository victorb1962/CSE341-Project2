const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../swagger.json');    // use generated json - npm run swagger
const swaggerDocument = require('../swaggerDesign.json'); // use custom json
const isLoggedIn = require('../middleware/auth.js');

router.use('/api-docs', isLoggedIn, swaggerUi.serve);
router.get('/api-docs', isLoggedIn, swaggerUi.setup(swaggerDocument));

module.exports = router; 