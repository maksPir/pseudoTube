const Router = require('express');
const router = new Router();
const commentController = require('../comment/controller/comment.controller');
router.get('/comment/:idFilm', commentController.getCommentsFilmById);
router.post('/comment', commentController.addCommentFilmById);

module.exports = router;
