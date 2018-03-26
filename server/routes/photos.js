var express = require('express');
var router = express.Router();
var fs = require('file-system');
var config = require('../config');

/* GET image listing. */
router.get('/', function(req, res, next) {
		fs.readdir('./server/public/images', function(err, items) {
	    res.json(items.map(function (item) {
			return {
				src: config.apiHost + '/images/' +  item, width: 9, height: 6
			}
        }));
	});
});

router.get('/:keyword', function(req, res, next) {
	var keyword = req.params['keyword'];
	console.log(keyword);
    fs.readdir('./server/public/images', function(err, items) {
        res.json(items.filter(item => item.includes(keyword)).map(function (item) {
            return {
                src: config.apiHost + '/images/' +  item, width: 9, height: 6
            }
        }));
    });
});

module.exports = router;
