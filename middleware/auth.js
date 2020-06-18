const { User } = require('../models/User');

let auth = (req, res, next) => {
  //인증 처리

  //클라이언트 쿠키에서 토큰을 가져온다
  //let token = req.cookies.x_auth;

  //클라이언트가 보낸 요청 헤더에 토큰이 있는지 확인, 토큰 앞에 문자열 Bearar 가 있어야함
  if(!req.headers || !req.headers.authorization) {
    return res.status(401).send({ code: 1 , isAuth: false, err: true })
  }
  if(!/^Bearer/.test(req.headers.authorization)) {
    return res.status(401).send({ code: 1 , isAuth: false, err: true })
  }
  let token = req.headers.authorization.split(' ')[1];

  //토큰을 복호화 한후 유저를 찾는다
  User.findByToken(token, (err, user) => {
    if(err) throw err;
    if(!user) return res.json({ code: 1 , isAuth: false, err: true })

    req.token = token;
    req.user = user;
    next();
  })
}

module.exports = { auth };