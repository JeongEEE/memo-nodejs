const bodyParser = require('body-parser');
const House = require('../models/housekeep');

exports.contentAllGet = (req, res) => {
  House.find({ "systemUserId": req.params.systemUserId }).then((data) => {
    return res.status(200).json({
      code: 0,
      message: "요청성공",
      data: data,
    });
  })
  .catch((err) => {
    return res.status(500).json({
      code: 1,
      message: "서버오류",
      error: err,
    });
  });
}

exports.newContent = (req, res) => {
  let house = new House();
  house.systemUserId = req.body.systemUserId;
  house.contents = req.body.contents;

  house.save(house).then((data) => {
    return res.status(200)
      .json({ code: 0, message: "요청성공", data: data });
  })
  .catch((err) => {
    return res.status(500)
      .json({ code: 1, message: "서버오류", error: err });
  });
}

exports.contentModify = function (req, res) {
  // 게시글 수정
  House.findByIdAndUpdate(req.params.id, req.body).then((data) => {
    if (!data) {
      return res.status(404).json({
        code: 1,
        message: "해당하는 게시글을 찾을 수 없습니다.",
      });
    } else {
      return res.status(200)
        .json({ code: 0, message: "요청성공", data: data });
    }
  })
  .catch((err) => {
    return res.status(500)
      .json({ code: 1, message: "서버오류", error: err });
  });
};

exports.contentDelete = function (req, res) {
  House.findByIdAndRemove(req.params.id).then((data) => {
    if (!data) {
      return res.status(404).json({
        code: 1,
        message: "해당하는 게시글을 찾을 수 없습니다.",
      });
    } else {
      return res.status(200)
        .json({ code: 0, message: "요청성공" });
    }
  })
  .catch((err) => {
    return res.status(500)
      .json({ code: 1, message: "서버오류", error: err });
  });
};