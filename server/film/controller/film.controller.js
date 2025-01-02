const filmService=require('../service/film.service')
class FilmController{
    async getFilms(req,res,next)
    {
        try
        {
            const {main,count, direction}=req.query
            let films={}
            if(isNaN(Number(main))||isNaN(Number(count))||isNaN(Number(direction)))
            {
                films=await filmService.getFilms()
            }else
            {
                films=await filmService.getRangeFilms(main,count,direction)
            }
            return res.json(films)
        }
        catch(e)
        {
            next(e)
        }
    }
    async getFilmById(req,res,next)
    {
        try
        {
            const {idFilm}=req.params
            const response=await filmService.getFilmById(idFilm)
            return res.json(response)
        }
        catch(e)
        {
            next(e)
        }
    }
    async addFilm(req,res,next)
    {
        try {
            const {name, img, rate, desc}=req.body
            const film=await filmService.addFilm(name, desc, rate,img)
            return res.json(film)
        } catch (error) {
            next(error)
        }
    }
}

module.exports=new FilmController()