const Board = require('../models/board');
const Comment = require('../models/comment');

exports.boardGet = function (req, res) {
  // 전체 목록 요청
  Board.find({})
    .then(data => {
      res.status(200).send({ code: 0 , success: true, message: '요청성공', data: data });
    }).catch(err => {
      res.status(500).send({ code: 1 , success: false, message: '서버오류', error: err })
    }
  );
};

exports.boardReadDocumentFormId = function (req, res) {
  // id로 게시글 조회
  Board.findOne({ _id: req.params.id })
    .then(data => {
      if(!data) {
        res.status(404).send({ code: 1 , success: false, message: '해당하는 게시글을 찾을 수 없습니다.'});
      } else {
        res.status(200).send({ code: 0 , success: true, message: '요청성공', data: data });
      }
    }).catch(err => {
      res.status(500).send({ code: 1 , success: false, message: '서버오류', error: err })
    }
  );
};

exports.boardWrite = function (req, res) {
  // 게시글 쓰기
  var board = new Board();
  board.contents = req.body.contents;
  board.author = req.body.author;
  board.systemUserId = req.body.systemUserId;

  board.save(board)
    .then(data => {
      res.status(200).send({ code: 0 , success: true, message: '요청성공', data: data });
    }).catch(err => {
      res.status(500).send({ code: 1 , success: false, message: '서버오류', error: err })
    }
  );
};

exports.boardModify = function (req, res) {
  // 게시글 수정
  Board.findByIdAndUpdate(req.params.id , req.body)
    .then(data => {
      if(!data) {
        res.status(404).send({ code: 1 , success: false, message: '해당하는 게시글을 찾을 수 없습니다.'});
      } else {
        res.status(200).send({ code: 0 , success: true, message: '요청성공', data: data });
      }
    }).catch(err => {
      res.status(500).send({ code: 1 , success: false, message: '서버오류', error: err })
    }
  );
};

exports.boardDelete = function (req, res) {
  // 게시글 삭제
  Board.findByIdAndRemove(req.params.id)
    .then(data => {
      res.status(200).send({ code: 0 , success: true, message: '요청성공'});
    }).catch(err => {
      res.status(500).send({ code: 1 , success: false, message: '서버오류', error: err })
    }
  );
};

exports.boardCommentWrite = function (req, res) {
  // 게시글에 댓글 쓰기
  var comment = new Comment();
  comment.contents = req.body.contents;
  comment.author = req.body.author;
  comment.systemUserId = req.body.systemUserId;

  Board.findOneAndUpdate(
    {_id : req.params.id},
    { $push: { comments : comment } }, 
    (err, board) => {
      if(err) {
        return res.json({ code: 1 , success: false, message: '서버오류', error: err });
      }
      else return res.status(200).json({ code: 0 , success: true, message: '요청성공', data:board });
  });
};