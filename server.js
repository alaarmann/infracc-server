var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

var port = process.env.PORT || 8080;


var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test'); // connect to our database
var Resource     = require('./models/resource');

var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'Welcome!' });
});

router.route('/resources')
.post(function(req, res) {

    var resource = new Resource();
    console.log('Request body: ' + JSON.stringify(req.body));
    resource.name = req.body.name;
    console.log('Create resource ' + resource.name);
    resource.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Resource created' });
    });

})
    .get(function(req, res) {
        Resource.find(function(err, resources) {
            if (err)
                res.send(err);

            res.json(resources);
        });
    });

router.route('/resources/:resource_id')
    .get(function(req, res) {
        Resource.findById(req.params.resource_id, function(err, resource) {
            if (err)
                res.send(err);
            res.json(resource);
        });
    })
    .put(function(req, res) {

        Resource.findById(req.params.resource_id, function(err, resource) {

            if (err)
                res.send(err);

            resource.name = req.body.name;

            resource.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Resource updated!' });
            });

        });
    })
    .delete(function(req, res) {
        Resource.remove({
            _id: req.params.resource_id
        }, function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Resource deleted successfully' });
        });
    });



app.use('/infracc', router);

app.listen(port);
console.log('Server started on port ' + port);
