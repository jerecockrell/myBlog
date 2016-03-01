var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
	title: String,
	content: String,
	author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	image: String,
	date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', PostSchema);