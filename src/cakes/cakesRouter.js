const express = require('express')
let SampleCakes = require('../SampleCakes')

const cakesRouter = express.Router()

// GET /cakes
cakesRouter
  .route('/')
  .get((req, res) => {    
    res.json(SampleCakes)
	})

// POST /cakes
.post((req, res) => {     
	const { id, name, comment, imageUrl, yumFactor } = req.body        
	const newCake = { id, name, comment, imageUrl, yumFactor }
				
	SampleCakes = SampleCakes.concat(newCake) 
		
	res
		.status(201)
		.json(newCake)       
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

	//  DELETE /cakes/{id}
	.delete((req, res, next) => {
		let { cake_id } = req.params;
		let cakes = SampleCakes.filter(cake => cake.id != cake_id);

		if (!cake_id) {
			return res.status(404).json({
				error: { message: `Cake with id ${cake_id} doesn't exist` }
			})
		}

		res.json(cakes)
		next()
	})

	//  PUT /cakes/{id}
	.put((req, res, next) => {
		const { id, name, comment, imageUrl, yumFactor } = req.body        
		const cakeToUpdate = { id, name, comment, imageUrl, yumFactor }
		
		const numberOfValues = Object.values(cakeToUpdate).filter(Boolean).length
            
		if (numberOfValues === 0) {
			return res.status(400).json({
				error: {
					message: `Request body must contain either name, comment, or yumFactor`
				}
			})
		}

		for (let cake of SampleCakes) {
			if (cake.id == id) {
				if (cakeToUpdate.name != null || undefined) {
					cake.name = cakeToUpdate.name;
				}
				if (cakeToUpdate.comment != null || undefined) {
					cake.comment = cakeToUpdate.comment;
				}
				if (cakeToUpdate.yumFactor != null || undefined) {
					cake.yumFactor = cakeToUpdate.yumFactor;
				}
			}
		}	
		console.log(SampleCakes)
		res
      .status(200)
      .json(SampleCakes)       
	})  
	
	
module.exports = cakesRouter