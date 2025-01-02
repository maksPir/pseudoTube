const userService = require('../service/user.service');
const { validationResult } = require('express-validator');
const ApiError = require('../../exceptions/api-error');
require('dotenv').config();
class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequestError('Ошибка валидации', errors.array()));
      }
      const { email, password, name } = req.body;
      const userData = await userService.registration(email, name, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        domain: '.vercel.app',
        path: '/',
      });
      res.status(201).json(userData);
    } catch (e) {
      next(e);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        domain: '.vercel.app',
        path: '/',
      });
      res.json(userData);
    } catch (e) {
      console.log('Error login', e);
      next(e);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }
  async activate(req, res, next) {
    try {
      // const {email, password, name}=req.body
      // console.log(email, password, name);
      // const newUser=await db.query(`INSERT INTO users (email, name, password) values('${email}','${name}', '${password}') RETURNING *`)
      // res.json(newUser)
    } catch (e) {
      next(e);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        domain: '.vercel.app',
        path: '/',
      });
      res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async getUsers(req, res, next) {
    try {
      //const users=await userService.getAllUsers()
      return res.json({
        user: 'Maxim',
        cok: req.cookies,
        req: req,
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
