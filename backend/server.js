/*
Gabriel Bozza
3/1/24
IT 302-002 
Phase 2 Assignment
gmb28@njit.edu
*/
import express from 'express'
import cors from 'cors'
import ffxivData from './api/ffxivData.route.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/gmb28/ffxivData", ffxivData)

app.use('*', (req,res) => {
    res.status(404).json({error: "not found"})
})

export default app