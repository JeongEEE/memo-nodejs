const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const userApi = require('../controller/userController');
const boardApi = require('../controller/boardController');
const Board = require('../models/board');
const Comment = require('../models/comment');

router.get('/', (req, res) => {
  res.send('Home Page')
})

router.post('/api/users/register', userApi.userRegister);
router.post('/api/users/login', userApi.userLogin);
router.get('/api/users/auth', auth, userApi.userAuth);
router.get('/api/users/logout', auth, userApi.userLogout);

router.get('/board', boardApi.boardGet);
router.get('/board/:id', boardApi.boardReadDocumentFormId);
router.post('/api/board/write', auth, boardApi.boardWrite);
router.put('/api/board/modify/:id', auth, boardApi.boardModify);
router.delete('/api/board/delete/:id', auth, boardApi.boardDelete);
router.post('/api/comment/write', auth, boardApi.boardCommentWrite);

module.exports = router;