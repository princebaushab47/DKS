const {Schema, model} = require('../connection');
const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    role: {type:String, default:'user', enum:['user', 'admin']},
    createdAt: {type:Date, default:Date.now}
});

module.exports = model('users', UserSchema);