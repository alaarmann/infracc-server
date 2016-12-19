var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ResourceSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Resource', ResourceSchema);