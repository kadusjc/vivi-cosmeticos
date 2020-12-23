const { get, set, isString } = require('lodash')
const Customers = require('../model/customers')

const CustomerService = {

    async save (customer) {
        const { name, phoneNumber } = customer 
        let customers = await Customers.find({'$or':[{name: name.toUpperCase()}, {phoneNumber}]})
        if (get(customers, 'length', 0) > 0) {
            throw new Error('Já consta um usuário no seu cadastro de mesmo NOME ou TELEFONE')
        }
        set(customer, 'name', get(customer, 'name', '').toUpperCase())
        customer = await Customers.create(customer)
        return customer
    },

    async find (filter) {
        let name = get(filter, 'name', '')
        let phoneNumber = get(filter, 'phoneNumber', '')
        
        const query = {}
        if (name) { query['name'] = { $regex: name, $options: 'i' } } 
        if (phoneNumber) { query['phoneNumber'] = { $regex: phoneNumber, $options: 'i' } }
        
        let customers = await Customers.find(query)
        return customers
    }
}

module.exports = CustomerService