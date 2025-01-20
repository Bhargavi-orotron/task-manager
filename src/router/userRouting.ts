import {signUp} from '../controller/userController'
import { Hono } from 'hono'
const route=new Hono()

route.post('/signUp',signUp)

export default route