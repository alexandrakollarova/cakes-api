const express = require('express')
let SampleCakes = require('../SampleCakes')

const cakesRouter = express.Router()

// GET /cakes
cakesRouter
  .route('/')
  .get((req, res) => {    
    res.json(SampleCakes)
  })
	
	
module.exports = cakesRouter