import { getById} from '../controller/authController'
import {signUp,login,forgotPassword,resetPassword} from '../controller/userController'
import { Hono } from 'hono'
const route=new Hono()

route.post('/signUp',signUp)
route.post('/login',login)
route.get('/getById/:id',getById)
route.post('/forgotPassword',forgotPassword)
route.post('/resetPassword',resetPassword)

export default route