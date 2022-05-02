import { Router } from 'express'
import * as newsCtrl from '../controllers/newss.js'

const router = Router()

router.post('/', newsCtrl.create)

export {
    router
}