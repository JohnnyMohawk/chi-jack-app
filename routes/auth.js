import { Router } from 'express'
import * as authCtrl from '../controllers/auth.js'
import { decodeUserFromToken } from '../middleware/auth.js' 

const router = Router()

/*---------- Public Routes ----------*/
router.post('/signup', authCtrl.signup)
router.post('/login', authCtrl.login)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)

export {
    router
}