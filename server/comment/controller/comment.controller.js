const commentService=require('../service/comment.service')
class CommentController{
    async getCommentsFilmById(req,res,next)
    {
        try
        {
            const {idFilm}=req.params
            const comments=await commentService.getCommentsFilmById(idFilm)
            return res.json({comments:comments})
        }
        catch(e)
        {
            next(e)
        }
    }
    async addCommentFilmById(req,res,next)
    {
        try
        {
            const {idFilm, idUser,text}=req.body
            const response=await commentService.addCommentFilmById(idFilm,idUser,text)
            return res.status(201).json({ message:response})
        }
        catch(e)
        {
            next(e)
        }
    }
}

module.exports=new CommentController()