const express = require('express');
const app = express();

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './src/css/uploads/')
    },
    filename: function (req,file,cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({storage: storage, limits:{
    fileSize: 1024*1024 * 15
    }});

const todoList = require('../controllers/todoListController');

app.route('/gallery/')
    .get(todoList.allGalleries)
    .post(todoList.newGalleries);


app.route('/gallery/:path')
    .get(todoList.getImages)
    .post(upload.array('image[]',10), todoList.addImages);


module.exports = app;