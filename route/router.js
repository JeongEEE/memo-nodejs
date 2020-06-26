const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const userApi = require('../controller/userController');
const boardApi = require('../controller/boardController');
const fs = require('fs');

router.get('/note', (req, res) => {
  //res.send('Home Page')
  fs.readFile('index.html', function(err, data) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
})

router.post('/note/api/users/register', userApi.userRegister);
router.post('/note/api/users/login', userApi.userLogin);
router.get('/note/api/users/auth', auth, userApi.userAuth);
router.get('/note/api/users/logout', auth, userApi.userLogout);

router.get('/note/api/board', boardApi.boardGet);
router.get('/note/api/board/:id', boardApi.boardReadDocumentFormId);
router.post('/note/api/board/write', auth, boardApi.boardWrite);
router.put('/note/api/board/modify/:id', auth, boardApi.boardModify);
router.delete('/note/api/board/delete/:id', auth, boardApi.boardDelete);
router.post('/note/api/comment/write', auth, boardApi.boardCommentWrite);

module.exports = router;