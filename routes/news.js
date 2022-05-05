import { Router } from 'express'
import * as newsCtrl from '../controllers/newss.js'

const router = Router()

router.post('/', newsCtrl.create)

router.get('/', newsCtrl.newsIndex)

export {
    router
}