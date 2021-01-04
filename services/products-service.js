const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const { get, set, toString } = require('lodash')
    
const Products = require('../model/products')

const ProductService = {

    async save (product) {
        let { name, brand, category } = product 
        name = name.toUpperCase()
        brand = brand.toUpperCase()
        category = category.toUpperCase()

        let products = await Products.find({name, brand, category})
        if (get(products, 'length', 0) > 0) {
            throw new Error('Já consta um PRODUTO no seu cadastro de mesmo NOME para esta MARCA e CATEGORIA')
        }
        set(product, 'name', get(product, 'name', '').toUpperCase())
        set(product, 'brand', get(product, 'brand', '').toUpperCase())
        set(product, 'category', get(product, 'category', '').toUpperCase())
        product = await Products.create(product)
        return product
    },

    async update (product) {
        let { _id, name, brand, category, volume } = product 
        name = name.toUpperCase()
        brand = brand.toUpperCase()
        category = category.toUpperCase()

        const productIdString = toString(_id)
        _id = new ObjectId(productIdString)
        
        let products = await Products.find({'$and': [
            {'_id': {'$ne': _id }, name, brand, category}
        ]})

        if (get(products, 'length', 0) > 0) {
            throw new Error('Já consta um OUTRO produto no seu cadastro de mesmo NOME para esta MARCA e CATEGORIA')
        }
        set(product, 'name', get(product, 'name', '').toUpperCase())
        set(product, 'brand', get(product, 'brand', '').toUpperCase())
        set(product, 'category', get(product, 'category', '').toUpperCase())
        
        product = await Products.findOneAndUpdate({_id}, {$set: { name, brand, category, volume } }, { multi: true })
        return product
    },

    async find (filter) {
        let name = get(filter, 'name', '').toUpperCase()
        let category = get(filter, 'category', '').toUpperCase()
        let brand = get(filter, 'brand', '').toUpperCase()
        
        const query = {}
        if (name) { query['name'] = { $regex: name, $options: 'i' } } 
        if (category) { query['category'] = { $regex: category, $options: 'i' } }
        if (brand) { query['brand'] = { $regex: brand, $options: 'i' } }
        
        let products = await Products.find(query).sort({name: 1})
        return products
    },
    

    async remove (id) {
        const productIdString = toString(id)
        const productId = new ObjectId(productIdString)
        await Products.remove({_id: productId})
    }
}

module.exports = ProductService