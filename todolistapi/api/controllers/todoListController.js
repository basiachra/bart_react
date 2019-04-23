const image = require('../models/imagesModel');

exports.newGalleries = function(req, res) {
    const model = new image({
        "gallery.path" : req.body.path,
        "gallery.name" : req.body.name}
    );
    model.save()
        .then( res.json('Server added successfully'))
        .catch(err => {
            res.status(400).send("Chybne zadaný request - nevhodný obsah podľa schémy.");
        });
};

exports.allGalleries = function(req, res) {
    image.find(function(err, galleries) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(galleries);
        }
    })
};

exports.addImages = function(req, res) {

    let l = 0;
    let img = [];
    while(req.body.filename[l] !== undefined){
        img.push({name : req.body.filename[l],
                    path : req.body.filename[l]});
        l++;
    }

    image.updateOne({
        "gallery.path": req.body.gallery[0]
    }, {
        $push: {
            "images":img
        }
    }, function(err, results) {
        console.log(results.result);
    });
};

exports.getImages = function(req, res) {

    image.find({"gallery.path": req.params.path },function (err, galleries) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(galleries);
            console.log(galleries)
        }});
};
