const tokenService =require('../user/service/token.service')
const ApiError=require('../exceptions/api-error')
module.exports=function(req,res, next)
{
    try {
        // const authHeader=req.headers.authorization
        // if(!authHeader)return next(ApiError.UnauthorizedError())
        // const accessToken=authHeader.split(' ')[1]
        // if(!accessToken) return next(ApiError.UnauthorizedError())
        // const userData=tokenService.validateAccessToken(accessToken)
        // if(!userData) return next(ApiError.UnauthorizedError())
        // res.user=userData
        next()
    } catch (error) {
        return next(ApiError.UnauthorizedError())
    }
}