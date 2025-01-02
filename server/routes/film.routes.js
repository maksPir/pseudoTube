const Router=require('express')
const router=new Router()
const filmController=require('../film/controller/film.controller')
router.get('/film/:idFilm', filmController.getFilmById)
router.get('/film', filmController.getFilms)
router.post('/film', filmController.addFilm)


module.exports=router