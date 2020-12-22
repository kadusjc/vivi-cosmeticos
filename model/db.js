const mongoose = require('mongoose')

const env = {
    'test': 'mongodb://localhost/viviCosmeticosTest',
    'development': 'mongodb://localhost/viviCosmeticos',
    'production': process.env.MONGODB_URI
}
const CONNECTION_URL = env[process.env.NODE_ENV]
mongoose.connect(CONNECTION_URL)