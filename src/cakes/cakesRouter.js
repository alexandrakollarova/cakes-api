const express = require('express')
let SampleCakes = require('../SampleCakes')

const cakesRouter = express.Router()

// GET /cakes
cakesRouter
  .route('/')
  .get((req, res) => {    
    res.json(SampleCakes)
	})
	
//  GET /cakes/{id}   
cakesRouter
  .route('/:cake_id')
	.get((req, res, next) => {
		let { cake_id } = req.params;
		let cake = SampleCakes.find(cake => cake.id == cake_id);		

		if (!cake_id) {
			return res.status(404).json({
				error: { message: `Cake with id ${cake_id} doesn't exist` }
			})
		}
		res.json(cake) 
		next()
	})
	
	
module.exports = cakesRouter