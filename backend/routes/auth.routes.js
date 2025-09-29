
import exprees from 'express'
import { register,login ,logout} from '../controller/auth.controller.js'

const authRouter = exprees.Router()


authRouter.post('/register' , register)
authRouter.post('/login' ,login)
authRouter.post('/logout' ,logout)

export default authRouter