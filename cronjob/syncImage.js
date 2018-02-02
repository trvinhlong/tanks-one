
var cron = require('cron');
var request = require('request');

var job = new cron.CronJob({
  cronTime: '55 * * * *',
  onTick: function() {
    
	request('http://tanks.vn/facebook/login', function (error, response, body) {
        console.log(response);
	});
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});

console.log('job started');
job.start();

