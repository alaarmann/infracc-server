var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ResourceSchema   = new Schema({
    key: {
        type : String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Resource', ResourceSchema);