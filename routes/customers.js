const { get } = require('lodash')
const express = require('express');
const router = express.Router();
const CustomerService = require('../services/customer-service')

/* GET customers listing. */
router
  .get('/', async (req, res) => {
    let filter = req.query    
    let customers = await CustomerService.find(filter)
    res.json(customers)
  })

  .post('/', async (req, res) => {    
    let customer = req.body
    try {
      customer = await CustomerService.save(customer)    
      res.json(customer)
    } catch (error) {
      res.status(500).send(error.message)
    }    
  })

module.exports = router;
