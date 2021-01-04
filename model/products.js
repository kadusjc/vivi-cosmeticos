const mongoose = require('mongoose')
const { Schema } = mongoose

const Products = Schema({  
  brand: {type: String, enum: ['AVON', 'BOTICÁRIO', 'EUDORA', 'NATURA'], default: 'AVON'},
  category: {type: String},
  name: {type: String},
  volume: {type: Number},
  measureUnit: {type: String, enum: ['kg', 'g', 'mg', 'l', 'ml'], default: 'ml'},
  createdAt: {type: Date, default: Date.now }  
})

module.exports = mongoose.model('products', Products, 'products')
