/* jshint esversion:6 */
const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let uniqueValidator = require('mongoose-unique-validator');

let categorySchema = new Schema({
    description: {
        type: String,
        required: [true, 'description is required'],
        unique: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    deleted: {
        type: Boolean,
        default: false
    }
});


categorySchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });

module.exports = mongoose.model('Category', categorySchema);