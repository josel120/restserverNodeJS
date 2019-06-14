var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var productoSchema = new Schema({
    name: { type: String, required: [true, 'name is required'] },
    priceUni: { type: Number, required: [true, 'price is required'] },
    description: { type: String, required: false },
    img: { type: String, required: false },
    available: { type: Boolean, required: true, default: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});


module.exports = mongoose.model('Producto', productoSchema);