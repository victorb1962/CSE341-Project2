# Instructor Example is not to be copied

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
   - Could use routes.rest
2. http://localhost:8080/api-docs
3. http://localhost:8080/artwork
4. http://localhost:8080/contact

   - GET / artwork /
   - GET / artwork / {id}
   - GET / artwork / POST, PUT, DELETE

   - GET / contact /
   - GET / contact / {id}
   - GET / contact / POST, PUT, DELETE

5. Verify from MongoDB

6. Before uploading to GitHub run the following to make sure you have no issues

- npm run lint - helps to enforce packge.json standards
- npm run format
- edit swagger.js to use production host: https://victor-341w01.onrender.com/

6. Push to GitHub
7. Confirm sync with Render

8. https://victor-341w05.onrender.com/api-docs
9. https://victor-341w05.onrender.com/artwork
10. https://victor-341w05.onrender.com/contact

- GET / artwork /
- GET / artwork / {id}
- GET / artwork / POST, PUT, DELETE

- GET / contact /
- GET / contact / {id}
- GET / contact / POST, PUT, DELETE
