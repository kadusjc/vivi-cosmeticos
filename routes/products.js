const express = require('express');
const router = express.Router();
const ProductsService = require('../services/products-service')

router
  .get('/', async (req, res) => {
    let filter = req.query    
    let products = await ProductsService.find(filter)
    res.json(products)
  })

  .post('/', async (req, res) => {    
    let product = req.body
    try {
      product = await ProductsService.save(product)    
      res.json(product)
    } catch (error) {
      res.status(500).send(error.message)
    }    
  })

  .put('/', async (req, res) => {    
    let product = req.body
    try {
      product = await ProductsService.update(product)    
      res.json(product)
    } catch (error) {
      res.status(500).send(error.message)
    }    
  })

  .delete('/:id', async (req, res) => {    
    let { id } = req.params
    try {
      product = await ProductsService.remove(id)    
      res.json(product)
    } catch (error) {
      res.status(500).send(error.message)
    }    
  })

module.exports = router;
