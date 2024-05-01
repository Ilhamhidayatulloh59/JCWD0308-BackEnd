import { UserController } from '@/controllers/user.controller';
import { UserMiddleware } from '@/middlewares/user.middleware';
import { Router } from 'express'

export class UserRouter {
    private router: Router;
    private userController: UserController;
    private userMiddleware: UserMiddleware

    constructor() {
        this.userController = new UserController()
        this.userMiddleware = new UserMiddleware()
        this.router = Router()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.get('/', this.userMiddleware.log, this.userController.getUser)
        this.router.post('/', this.userController.userRegister)
    }

    getRouter() {
        return this.router
    }
} 