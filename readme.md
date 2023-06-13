# Project: Week 6 - 8

## Video Explanation

https://youtu.be/AIi1gZOsRmY

## Vic's notes

I'm using an artwork database I used for an earlier course.

## How to run it

Run npm install and npm start from the backend folder in the terminal

- Run the following in the terminal:
- npm install
- npm install mongodb express dotenv
- npm install axios passport passport-github2 cookie-session validatorjs
- npm install body-parser --save
- npm install express-validator cors --save
- npm install express express-openid-connect --save

- npm install joi joi-password-complexity

- npm install --save-dev swagger-autogen See https://www.npmjs.com/package/swagger-autogen
- npm install swagger-ui-express See https://www.npmjs.com/package/swagger-ui-express
- npm run swagger To recreate swagger.json

- npm install eslint-config-prettier eslint-plugin-prettier prettier --dev
- npm run lint
- npm run format

- npm start

## Environment variables

Start MongoDB connection in VS Code
Don't forget to create the .env file. If you are unsure of how to do this, watch the stretch solution video.
Environmental Variables required for:

- MongoDB connection
- Github authentication
- Auhto0 authentication - if used

## Testing

Test the endpoints in the routes.rest file with Rest Client or another similar tool.

- Validation is difficult to test locally due to authentication setup.
- Deply and test from production: https://victor-341w05.onrender.com

1. Browser test (local):

   http://localhost:3000/ < 'Cannot GET /'

   - Use routes.rest
     http://localhost:3000/api-docs
     http://localhost:3000/artwork
     http://localhost:3000/contact

2. Test validation rules with (may have to do this from production):

   - GET / contact /
   - GET / contact / {id}
   - GET / contact / POST, PUT, DELETE

3. Before uploading to GitHub run the following to make sure you have no issues

- npm run lint - helps to enforce packge.json standards
- npm run format
- edit swagger.js To use production host: https://victor-341w01.onrender.com/
- npm run swagger To recreate swagger.json - if not using a custom design

4. Push to GitHub
5. Confirm sync with Render

6. Browser test (productionl):

   https://victor-341w05.onrender.com/api-docs
   https://victor-341w05.onrender.com/artwork
   https://victor-341w05.onrender.com/contact

7. Test validation rules with:

   - GET / contact /
   - GET / contact / {id}
   - GET / contact / POST, PUT, DELETE

## Week 6 - Validation & Error Handling

### Assignment Steps

- Add PUT (UPDATE) and DELETE routes to your API. Verify in MongoDB that these work as intended.
  -- See \controller\contact.js
  -- See \config\ for validation config file
  -- See \controller\contact.js
- Add validation to your routes
- Add error handling to your routes
  -- All validation handled in controllers\contact.js
- Update your swagger API documentation to include these changes
- Push to GitHub.
- Publish to Render.

## Week 7 - Auth0 incorporated

- see D:\BYU_files\2023-02 SPRING semester\CSE341_WebServices\CSE341-node\w07\w07_class\readme.md for more details
- edit Allowed Callback URLs - to iclude http://localhost:3000/callback (comma delimited)

- edit .env
- edit server.js

### VS Code / Terminal:

- npm install express express-openid-connect --save
- npm start

### Browser tests:

- localhost:3000 - 'Logged out'
- localhost:3000/login - use google login & authentication
- localhost:3000/profile - shows my google user details incl link to thumbnail
- localhost:3000/api-docs
- localhost:3000/logout

### ToDo for Production UPLOAD

- edit env file for production (https)
- add environmental variables to Render - since .env files is never deployed

- edit swagger.js to use production host: https://victor-341w01.onrender.com/
- npm run swagger - to recreate swagger.json

- Push to GitHub
- Confirm sync with Render

## Week 8 - Auth0 continued

### Final checklist

1. Deploy to production
2. Include authentication with OAuth
3. Include GET, POST, PUT, DELETE endpoints
4. Produce API documentation/swagger and test from
5. Validate all data before processing API requests
6. Handle errors in app
