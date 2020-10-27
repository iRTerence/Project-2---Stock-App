const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;



const watchSchema = new Schema({
    ticker: {
        type: String,
        require: true,
        unique: true,
    },
})

watchSchema.plugin(uniqueValidator);


const portSchema = new Schema({
    ticker: {
        type: String,
        require: true,
    },
    value: {
        type: Number,
        default: 0
    },
    ammount: {
        type: Number,
    }
})

const userSchema = new Schema({
    watch: [watchSchema],
    portfolio: [portSchema],
    googleId: String,
    name: String
}) 


module.exports = mongoose.model('Stocks', userSchema);
