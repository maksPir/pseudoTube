const db=require('../../db')
const ApiError=require('../../exceptions/api-error')
class CommentService{
    async getCommentsFilmById(filmId)
    {
        const candidate=await db.query(`
            SELECT com.id, message, com.id_user, id_film, (date_comment::date)||'' as date_comment, user_table.email
            FROM public.comments as com
            left join public.users as user_table on user_table.id=com.id_user
            where id_film=${filmId}  order by com.id desc`)
        if(candidate.rowCount==0) return []
        return candidate.rows
    }
    async addCommentFilmById(filmId, userId, text)
    {
        const res=`
        INSERT INTO public.comments(
            message, id_user, id_film)
               VALUES ('${text}',${userId},${filmId})`
        await db.query(res)
        return 'Комментарий успешно добавлен'
    }
}

module.exports=new CommentService()