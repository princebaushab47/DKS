const {Schema, model} = require('../connection');
const FeedbackSchema = new Schema({
    name: String,
    email: String,
    message: String,
    rating: Number,
    createdAt: {type:Date, default:Date.now}
});

module.exports = model('feedbacks', FeedbackSchema);

