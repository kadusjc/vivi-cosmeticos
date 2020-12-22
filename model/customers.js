const mongoose = require('mongoose')
const { Schema } = mongoose

const Customers = Schema({  
  name: String,
  phoneNumber: String,
  createdAt: {type: Date, default: Date.now },
  preferences: [String], 
  isDefaulting: { type: Boolean, default: false},
})

module.exports = mongoose.model('customers', Customers, 'customers')
