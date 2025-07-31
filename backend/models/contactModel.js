const {Schema, model} = require('../connection');
const ContactSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    message: String,
    createdAt: {type:Date, default:Date.now}
});

module.exports = model('contacts', ContactSchema);
