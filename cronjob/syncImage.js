
var cron = require('cron');
var request = require('request');

var job = new cron.CronJob({
  cronTime: '45 * * * *',
  onTick: function() {
    
	request('http://tanks.vn/facebook/login', function (error, response, body) {

	});
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});

job.start();

