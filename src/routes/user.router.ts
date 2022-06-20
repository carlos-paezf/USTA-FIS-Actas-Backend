import { BaseRouter } from "../config";
import { UserController } from "../controllers";


export class UserRouter extends BaseRouter<UserController> {
    constructor() {
        super(UserController)
    }

    protected routes(): void {
        this.router.get('/users', this.controller.findAllUsers)
        this.router.get('/users/:id', this.controller.findOneUserById)
        this.router.post('/users', this.controller.createUser)
        this.router.put('/users/:id', this.controller.updateUserById)
        this.router.delete('/users/:id', this.controller.deleteUserById)
        this.router.delete('/users/destroy/:id', this.controller.destroyUserById)
    }
}