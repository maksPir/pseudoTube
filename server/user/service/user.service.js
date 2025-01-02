const bcrypt=require('bcryptjs')
const db=require('../../db')
const ApiError=require('../../exceptions/api-error')
const uuid=require('uuid')
const tokenService=require('./token.service')
const UserDto=require('../dto/user.dto')
class UserService{
    async isRegistered(email)
    {
        const candidate=await db.query(`SELECT * FROM users WHERE email='${email}'`)
        if(candidate.rowCount==0) return false
        return candidate.rows[0]
    }
    async getUserById(userId)
    {
        const candidate=await db.query(`SELECT * FROM users WHERE id='${userId}'`)
        if(candidate.rowCount==0) return false
        return candidate.rows[0]
    }
    async registration(email, name, password)
    {
        const is_reg=await this.isRegistered(email)
        if(is_reg)
        {
            throw ApiError.BadRequestError(`Пользователь с таким email уже зарегистрирован`)
        }
        const hashPassword=await bcrypt.hash(password,3)
        const activatedLink=uuid.v4()
        const newUser=
        await db.query(`INSERT INTO users (email, name, password, activate_link)
        values('${email}','${name}', '${hashPassword}', '${activatedLink}') RETURNING email, is_verified, id`)
       // await mailService.sendActivationMail(email,`${process.env.URL_API}/api/activate/${activatedLink}`)
        const userDto=new UserDto(newUser.rows[0])
        const tokens=tokenService.generatesTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {
            ...tokens,
            user:userDto
        }

    }
    async login(email, password)
    {
        const user=await this.isRegistered(email)
        if(!user)
        {
            throw ApiError.BadRequestError('Пользователь не был найден')
        }
        const isPassEquals=await bcrypt.compare(password,user.password)
        if(!isPassEquals)
        {
            throw ApiError.BadRequestError('Неверный логин или пароль')
        }
        const userDto=new UserDto(user)
        const tokens=tokenService.generatesTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {
            ...tokens,
            user:userDto
        }
    }
    async logout(refreshToken)
    {
        const token=await tokenService.deleteToken(refreshToken)
        return token
    }
    async refresh(refreshToken)
    {
        if(!refreshToken)
        {
            throw ApiError.UnauthorizedError();
        }
        const userData=tokenService.validateRefreshToken(refreshToken)
        const tokenFromDB=await tokenService.isExistTokenByToken(refreshToken)
        if(!tokenFromDB||!userData)
        {
            throw ApiError.UnauthorizedError(refreshToken);
        }
        const user=await this.getUserById(userData.id)
        const userDto=new UserDto(user)
        const tokens=tokenService.generatesTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {
            ...tokens,
            user:userDto
        }
    }
    async getAllUsers(){
        const users=await db.query(`SELECT * FROM users`)
        return users.rows 
    }
}

module.exports=new UserService()