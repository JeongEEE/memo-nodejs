const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const userApi = require('../controller/userController');
const boardApi = require('../controller/boardController');
const houseApi = require('../controller/houseController');
const fs = require('fs');

router.get('/note', (req, res) => {
  //res.send('Home Page')
  fs.readFile('index.html', function(err, data) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
})
/**
 * @swagger
 * definitions:
 *  User:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *      email:
 *        type: string
 *      password:
 *        type: string
 *        minlength: 5
 *      systemUserId:
 *        type: number
 *      token:
 *        type: string
 *      required:
 *        - name
 *        - email
 *        - password
 */
/**
 * @swagger
 * definitions:
 *   Error_Response:
 *     headers:
 *       Access-Control-Allow-Origin:
 *         type: string
 *     properties:
 *       code:
 *         type: number
 *         example: 1
 *       message:
 *         type: string
 *         example: '서버오류'
 *       error:
 *         type: string
 *   400Error_Response:
 *     headers:
 *       Access-Control-Allow-Origin:
 *         type: string
 *     properties:
 *       code:
 *         type: number
 *         example: 1
 *       message:
 *         type: string
 *         example: '잘못된 요청'
 *       error:
 *         type: string
 *   Register_Response:
 *     headers:
 *       Access-Control-Allow-Origin:
 *         type: string
 *     properties:
 *       code:
 *         type: number
 *       success:
 *         type: boolean
 *       message:
 *         type: string
 *         example: '요청성공'
 *         description: 요청 성공, 실패 메시지
 *       systemUserId:
 *         type: number
 *         description: 시스템유저아이디
 *         example: 5984
 *   Login_Response:
 *     headers:
 *       Access-Control-Allow-Origin:
 *         type: string
 *     properties:
 *       code:
 *         type: number
 *       message:
 *         type: string
 *         description: 요청 성공, 실패 메시지
 *         example: '요청성공'
 *       success:
 *         type: boolean
 *       _id:
 *         type: string
 *         description: 유저 MongDB 아이디
 *         example: '5ee323e6878807f0...'
 *       systemUserId:
 *         type: number
 *         description: 시스템유저아이디
 *         example: 5984
 *       name:
 *         type: string
 *         example: 'Jack'
 *       token:
 *         type: string
 *         example: 'eyJhbGciOiJIUzI1NiJ9.NWVlM....'
 *   UserData_Response:
 *     headers:
 *       Access-Control-Allow-Origin:
 *         type: string
 *     properties:
 *       code:
 *         type: number
 *       message:
 *         type: string
 *         description: 요청 성공, 실패 메시지
 *         example: '요청성공'
 *       data:
 *         type: object
 *         properties:
 *           _id:
 *              type: string
 *              description: 유저 MongDB 아이디
 *              example: '5ee323e6878807f0...'
 *           systemUserId:
 *              type: number
 *              description: 유저 아이디
 *              example: 5984
 *           name:
 *              type: string
 *              example: 'Jack'
 *           email:
 *              type: string
 *              example: 'test@test.com'
 *   Basic_Response:
 *     headers:
 *       Access-Control-Allow-Origin:
 *         type: string
 *     properties:
 *       code:
 *         type: number
 *       message:
 *         type: string
 *         description: 요청 성공, 실패 메시지
 *         example: '요청성공'
 *       data:
 *         type: object
 *   404_Response:
 *     headers:
 *       Access-Control-Allow-Origin:
 *         type: string
 *     properties:
 *       code:
 *         type: number
 *         example: 1
 *       message:
 *         type: string
 *         description: 실패 메시지
 *         example: '데이터를 찾을 수 없습니다.'
 */

/**
 * @swagger
 * /note/api/users/register:
 *   post:
 *     tags:
 *       - User API
 *     description: 회원가입
 *     parameters:
 *       - in: body
 *         name: body
 *         description: 이름, 이메일, 비밀번호
 *         type: object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *            name:
 *               type: string
 *               example: 'Jack'
 *            email:
 *               type: string
 *               example: 'test-customer00@test.com'
 *            password:
 *               type: string
 *               example: '123123'
 *               format: password
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 회원가입 요청성공
 *         schema:
 *           $ref: '#/definitions/Register_Response'
 *       500:
 *         description: 서버오류
 *         schema:
 *           $ref: '#/definitions/Error_Response'
 */
router.post('/note/api/users/register', userApi.userRegister);

/**
 * @swagger
 * /note/api/users/login:
 *   post:
 *     tags:
 *       - User API
 *     description: 로그인
 *     parameters:
 *       - in: body
 *         name: body
 *         description: 이메일, 비밀번호
 *         type: object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *              email:
 *                 type: string
 *                 example: 'test-customer00@test.com'
 *              password:
 *                 type: string
 *                 example: '123123'
 *     required:
 *       - email
 *       - password
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 로그인 요청성공
 *         schema:
 *           $ref: '#/definitions/Login_Response'
 *       400:
 *         description: "잘못된 요청"
 *         schema:
 *           $ref: "#/definitions/400Error_Response"
 *       500:
 *         description: 서버오류
 *         schema:
 *           $ref: '#/definitions/Error_Response'
 */
router.post('/note/api/users/login', userApi.userLogin);
router.get('/note/api/users/auth', auth, userApi.userAuth);

/**
 * @swagger
 * /note/api/users/logout:
 *   post:
 *     tags:
 *       - User API
 *     description: 로그아웃(토큰 삭제)
 *     parameters:
 *       - in: body
 *         name: body
 *         description: 유저 MongoDB 아이디(_id)
 *         type: object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *              _id:
 *                 type: string
 *                 example: '5ee323e6878807f0...'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 로그아웃 요청성공
 *         schema:
 *           properties:
 *             code:
 *               type: number
 *             success:
 *               type: boolean
 *             message:
 *               type: string
 *               description: 요청 성공, 실패 메시지
 *               example: '요청성공'
 *       400:
 *         description: "잘못된 요청"
 *         schema:
 *           $ref: "#/definitions/400Error_Response"
 *       500:
 *         description: 서버오류
 *         schema:
 *           $ref: '#/definitions/Error_Response'
 */
router.post('/note/api/users/logout', auth, userApi.userLogout);

/**
 * @swagger
 * /note/api/users/data:
 *   post:
 *     tags:
 *       - User API
 *     description: 사용자 데이터 조회
 *     parameters:
 *       - in: body
 *         name: body
 *         description: 유저 아이디
 *         type: object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *              systemUserId:
 *                 type: number
 *                 example: 8059
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: 사용자 데이터 조회 요청성공
 *         schema:
 *           $ref: '#/definitions/UserData_Response'
 *       400:
 *         description: "잘못된 데이터"
 *         schema:
 *           $ref: "#/definitions/400Error_Response"
 *       500:
 *         description: 서버오류
 *         schema:
 *           $ref: '#/definitions/Error_Response'
 */
router.post('/note/api/users/data', auth, userApi.userData);

/**
 * @swagger
 * /note/api/board/{systemUserId}:
 *   get:
 *     tags:
 *       - Note API
 *     description: 모든 메모 데이터 요청
 *     parameters:
 *       - in: path
 *         name: systemUserId
 *         description: 유저 아이디
 *         type: string
 *         required: true
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: 모든 메모 데이터 요청성공
 *         schema:
 *           $ref: '#/definitions/Basic_Response'
 *       500:
 *         description: "서버 오류"
 *         schema:
 *           $ref: "#/definitions/Error_Response"
 */
router.get('/note/api/board/:systemUserId', auth, boardApi.boardGet);

/**
 * @swagger
 * /note/api/board/read/{id}:
 *   get:
 *     tags:
 *       - Note API
 *     description: 특정 메모 데이터 요청
 *     parameters:
 *       - in: path
 *         name: id
 *         description: MongoDB 문서 아이디
 *         type: string
 *         required: true
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: 데이터 조회 요청성공
 *         schema:
 *           $ref: '#/definitions/Basic_Response'
 *       404:
 *         description: 해당하는 데이터를 찾을 수 없습니다
 *         schema:
 *           $ref: '#/definitions/404_Response'
 *       500:
 *         description: "서버 오류"
 *         schema:
 *           $ref: "#/definitions/Error_Response"
 */
router.get('/note/api/board/read/:id', auth, boardApi.boardReadDocumentFormId);

/**
 * @swagger
 * /note/api/board/write:
 *   post:
 *     tags:
 *       - Note API
 *     description: 새로운 메모 입력
 *     parameters:
 *       - in: body
 *         name: body
 *         description: 유저 아이디, 유저 이름, 메모 내용
 *         type: object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *              systemUserId:
 *                 type: number
 *                 example: 8059
 *              author:
 *                 type: string
 *                 example: 'Jack'
 *              contents:
 *                 type: string
 *                 example: 'Memo test!'
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: 메모쓰기 요청성공
 *         schema:
 *           $ref: '#/definitions/Basic_Response'
 *       500:
 *         description: "서버 오류"
 *         schema:
 *           $ref: "#/definitions/Error_Response"
 */
router.post('/note/api/board/write', auth, boardApi.boardWrite);

/**
 * @swagger
 * /note/api/board/modify/{id}:
 *   put:
 *     tags:
 *       - Note API
 *     description: 메모 수정
 *     parameters:
 *       - in: path
 *         name: id
 *         description: MongoDB 문서 아이디
 *         type: string
 *         required: true
 *       - in: body
 *         name: body
 *         description: 유저 아이디, 유저 이름, 메모 내용
 *         type: object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *              systemUserId:
 *                 type: number
 *                 example: 8059
 *              author:
 *                 type: string
 *                 example: 'Jack'
 *              contents:
 *                 type: string
 *                 example: 'Memo test!'
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: 메모수정 요청성공
 *         schema:
 *           $ref: '#/definitions/Basic_Response'
 *       404:
 *         description: 해당하는 데이터를 찾을 수 없습니다
 *         schema:
 *           $ref: '#/definitions/404_Response'
 *       500:
 *         description: "서버 오류"
 *         schema:
 *           $ref: "#/definitions/Error_Response"
 */
router.put('/note/api/board/modify/:id', auth, boardApi.boardModify);

/**
 * @swagger
 * /note/api/board/delete/{id}:
 *   delete:
 *     tags:
 *       - Note API
 *     description: 메모 삭제
 *     parameters:
 *       - in: path
 *         name: id
 *         description: MongoDB 문서 아이디
 *         type: string
 *         required: true
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: 메모삭제 요청성공
 *         schema:
 *           $ref: '#/definitions/Basic_Response'
 *       404:
 *         description: 해당하는 데이터를 찾을 수 없습니다
 *         schema:
 *           $ref: '#/definitions/404_Response'
 *       500:
 *         description: "서버 오류"
 *         schema:
 *           $ref: "#/definitions/Error_Response"
 */
router.delete('/note/api/board/delete/:id', auth, boardApi.boardDelete);
router.post('/note/api/comment/write', auth, boardApi.boardCommentWrite);

/**
 * @swagger
 * /note/api/house/{systemUserId}:
 *   get:
 *     tags:
 *       - Housekeeping book API
 *     description: 모든 가계부 데이터 조회
 *     parameters:
 *       - in: path
 *         name: systemUserId
 *         description: 유저 아이디
 *         type: number
 *         required: true
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: 가계부 데이터 조회 요청성공
 *         schema:
 *           $ref: '#/definitions/Basic_Response'
 *       500:
 *         description: "서버 오류"
 *         schema:
 *           $ref: "#/definitions/Error_Response"
 */
router.get('/note/api/house/:systemUserId', auth, houseApi.contentAllGet);

/**
 * @swagger
 * /note/api/house/add:
 *   post:
 *     tags:
 *       - Housekeeping book API
 *     description: 가계부 데이터 추가
 *     parameters:
 *       - in: body
 *         name: body
 *         description: 유저 아이디, 가계부 내용
 *         type: object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *              systemUserId:
 *                 type: number
 *                 example: 8059
 *              contents:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     example: '지출'
 *                   title:
 *                     type: string
 *                     example: '음료 구입'
 *                   amount:
 *                     type: number
 *                     example: 1500
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: 가계부 데이터 추가 요청성공
 *         schema:
 *           $ref: '#/definitions/Basic_Response'
 *       500:
 *         description: "서버 오류"
 *         schema:
 *           $ref: "#/definitions/Error_Response"
 */
router.post('/note/api/house/add', auth, houseApi.newContent);

/**
 * @swagger
 * /note/api/house/modify/{id}:
 *   put:
 *     tags:
 *       - Housekeeping book API
 *     description: 가계부 데이터 수정
 *     parameters:
 *       - in: path
 *         name: id
 *         description: MongoDB 문서 아이디
 *         type: string
 *         required: true
 *       - in: body
 *         name: body
 *         description: 유저 아이디, 가계부 내용
 *         type: object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *              systemUserId:
 *                 type: number
 *                 example: 8059
 *              contents:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     example: '지출'
 *                   title:
 *                     type: string
 *                     example: '음료 구입'
 *                   amount:
 *                     type: number
 *                     example: 2000
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: 가계부 데이터 수정 요청성공
 *         schema:
 *           $ref: '#/definitions/Basic_Response'
 *       404:
 *         description: 해당하는 데이터를 찾을 수 없습니다
 *         schema:
 *           $ref: '#/definitions/404_Response'
 *       500:
 *         description: "서버 오류"
 *         schema:
 *           $ref: "#/definitions/Error_Response"
 */
router.put('/note/api/house/modify/:id', auth, houseApi.contentModify);

/**
 * @swagger
 * /note/api/house/delete/{id}:
 *   delete:
 *     tags:
 *       - Housekeeping book API
 *     description: 가계부 데이터 삭제
 *     parameters:
 *       - in: path
 *         name: id
 *         description: MongoDB 문서 아이디
 *         type: string
 *         required: true
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: 가계부 데이터 삭제 요청성공
 *         schema:
 *           $ref: '#/definitions/Basic_Response'
 *       404:
 *         description: 해당하는 데이터를 찾을 수 없습니다
 *         schema:
 *           $ref: '#/definitions/404_Response'
 *       500:
 *         description: "서버 오류"
 *         schema:
 *           $ref: "#/definitions/Error_Response"
 */
router.delete('/note/api/house/delete/:id', auth, houseApi.contentDelete);
