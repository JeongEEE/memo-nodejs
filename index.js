/*
* node module 설치한 목록
* npm install express --save
* npm install mongoose --save
* npm install body-parser --save
* npm install nodemon --save-dev
* npm install cookie-parser --save
* npm install bcrypt --save
* npm install --save jsonwebtoken swagger-jsdoc swagger-ui-express
*/

//const http = require('http');
const express = require('express');
const app = express();
const port = 7771;
const router = require('./route/router');
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');
const config = require('./config/key');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  swagger: '2.0',
  info: {
    title: 'Note_Server API',
    version: '1.0.0',
    description: '나만의 메모장, 가계부 기능을 제공하는 NodeJS 서버입니다.',
  },
  //host: '222.99.48.54:7771',
  host: 'ai0.beyless.com',
  basePath: '/',
  contact: {
    name: "GyuJeong Kim",
    email: "gjkim@beyless.com"
  },
  schemes: ["http", "https"], // 가능한 통신 방식
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header'
    }
  },
}
// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./route/*.js'],
};
const swaggerOptions = {
  customSiteTitle: "Note_Server API",
}
// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);
app.use('/note/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));

//application/x--www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());

//app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected! - Server Ready'))
  .catch(err => console.log(err))

app.use(router);

app.listen(port, err => {
  if(err) console.log(err);
  else console.log(`Server Start on port ${port}`);
})
