/*
* node module 설치한 목록
* npm install express --save
* npm install mongoose --save
* npm install body-parser --save
* npm install nodemon --save-dev
* npm install cookie-parser --save
* npm install bcrypt --save
* npm install jsonwebtoken --save
*/

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const router = require('./route/router');
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');
const config = require('./config/key');

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

app.use(router)

app.listen(port, err => {
  if(err) console.log(err);
  else console.log(`Server Start on port ${port}`);
})
