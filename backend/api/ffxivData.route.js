import express from 'express'
import ffxivDataController from './ffxivData.controller.js'
const router = express.Router()

router.route('/').get(ffxivDataController.apiGetData)

export default router
