const bodyParser = require('body-parser');
const { User } = require("../models/User");
// const cookieParser = require('cookie-parser');

exports.userRegister = function (req, res) {
  //회원가입시 필요한 정보
  const user = new User(req.body)
  user.systemUserId = getRandomInt(1, 100000);

  user.save((err, userInfo) => {
    if(err) {
      return res.json(
        { code: 1, success: false, message: '서버오류', error: err }
      );
    }
    else return res.status(200).json({
      code: 0,
      success: true,
      message: '요청성공',
      systemUserId: user.systemUserId
    })
  })
};

exports.userLogin = function (req, res) {
  //로그인 데이터를 데이터베이스에서 찾는다
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json({
        code: 1,
        loginSuccess: false,
        message: "해당하는 이메일의 유저가 없습니다."
      })
    }
    //데이터가 있다면 비밀번호 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) return res.json({ code: 1, loginSuccess: false, message: "비밀번호 오류" })

      //비밀번호가 맞다면 토큰생성
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);
        else return res.json({
          code: 0,
          message: '요청성공',
          loginSuccess: true,
          userId: user._id,
          systemUserId: user.systemUserId,
          name: user.name,
          token: user.token
        })
        //토큰을 저장한다. 쿠키에 저장
        // res.cookie("x_auth", user.token)
        // .status(200)
        // .json({ loginSuccess: true, userId: user._id})
      })
    })
  })
};

exports.userAuth = function (req, res) {
  //auth라는 미들웨어 통과햇다면 Authentication이 true라는 것
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
};

exports.userLogout = function (req, res) {
  User.findOneAndUpdate(
    { _id: req.user._id }, 
    { token: "" }, 
    (err, user) => {
      if(err) return res.json({ code: 1, success: false, message: '서버오류', error: err });
      else return res.status(200).send({
        code: 0,
        success: true,
        message: '요청성공',
    })
  })
};

function getRandomInt(min, max) { //min ~ max 사이의 임의의 정수 반환
  return Math.floor(Math.random() * (max - min)) + min;
}
