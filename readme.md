# Week 6

This is an example of a solution to demonstrate to students various ways they could set up their projects. Do not copy from this project, or clone it to build your own application. Use it to learn.

## API Documentation

https://birch-portfolio-builder.herokuapp.com/api-docs

### Video Explanation

[Video Walkthrough to share with students](https://youtu.be/AIi1gZOsRmY)

# Vic's notes

I'm using an artwork database I used for an earlier course.

# How to run it

Run npm install and npm start from the backend folder in the terminal

- Run the following in the terminal:
- npm install
- npm install mongodb express dotenv
- npm install eslint-config-prettier eslint-plugin-prettier prettier --dev
- npm run lint
- npm run format
- npm install joi
- npm install joi-password-complexity
- npm install body-parser --save
- npm install express-validator cors --save

- npm install --save-dev swagger-autogen See https://www.npmjs.com/package/swagger-autogen
- npm install swagger-ui-express See https://www.npmjs.com/package/swagger-ui-express
- npm run swagger - to recreate swagger.json
- npm start

## Environment variables

Start MongoDB connection in VS Code
Don't forget to create the .env file. If you are unsure of how to do this, watch the stretch solution video.

Test the endpoints in the routes.rest file with Rest Client or another similar tool.

Browser tests:

1. http://localhost:8080/ < 'Cannot GET /'
   - Use routes.rest
2. http://localhost:8080/api-docs
3. http://localhost:8080/artwork
4. http://localhost:8080/contact

   Test validation rules with:
   - GET / contact /
   - GET / contact / {id}
   - GET / contact / POST, PUT, DELETE

5. Before uploading to GitHub run the following to make sure you have no issues

- npm run lint - helps to enforce packge.json standards
- npm run format
- edit swagger.js to use production host: https://victor-341w01.onrender.com/
- npm run swagger - to recreate swagger.json

6. Push to GitHub
7. Confirm sync with Render

8. https://victor-341w05.onrender.com/api-docs
9. https://victor-341w05.onrender.com/artwork
10. https://victor-341w05.onrender.com/contact

Test validation rules with:
- GET / contact /
- GET / contact / {id}
- GET / contact / POST, PUT, DELETE

## Assignment Steps
- Add PUT (UPDATE) and DELETE routes to your API. Verify in MongoDB that these work as intended.
  -- See \controller\contact.js
  -- See \config\ for validation config file 
  -- See \controller\contact.js
- Add validation to your routes
- Add error handling to your routes
  -- All validation handled in controllers\contact.js
- Be sure to update your API documentation to include these news routes
- Push to GitHub.
- Publish to Render.


# Week 7 - Auth0 incorporated
- see D:\BYU_files\2023-02 SPRING semester\CSE341_WebServices\CSE341-node\w07\w07_class\readme.md for more details

##
- edit .env
- edit server.js

VS Code / Terminal:
npm install express express-openid-connect --save
npm start

Browser test: localhost:3000

### To Do for Production UPLOAD

- edit env file for production (https)