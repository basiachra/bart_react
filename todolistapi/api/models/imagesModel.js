var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ImagesSchema = new Schema({
        gallery: {
            path: {type: String},
            name: {type: String}
        },
        images:[
            {
                type:Object,
                path: {type: String},
                name: {type: String},
                modified: {type: Date}
                //image: {type: String, required:true}
            }
        ]
    },
    { collection: 'images'}
);

module.exports = mongoose.model('images', ImagesSchema);