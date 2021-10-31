import { Router } from 'express'
import * as emailCtrl from '../controllers/emails.js'

const router = Router()

router.post('/', emailCtrl.create)

export {
    router
}