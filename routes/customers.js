const express = require('express');
const router = express.Router();
const CustomerService = require('../services/customer-service')

/* GET customers listing. */
router
  .get('/', async (req, res) => {
    let filter = req.filter  
    let customers = await CustomerService.find(filter)
    res.json(customers)
  })

  .post('/', async (req, res) => {    
    let customer = req.body
    customer = await CustomerService.save(customer)    
    res.json(customer)
  })

module.exports = router;
