/*
Gabriel Bozza
3/1/24
IT 302-002 
Phase 2 Assignment
gmb28@njit.edu
*/
import express from 'express'
import ffxivDataController from './ffxivData.controller.js'
const router = express.Router()

router.route('/').get(ffxivDataController.apiGetData)

export default router