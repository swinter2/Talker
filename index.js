var express = require('express'),
	app = express();

app.use('/', express.static(__dirname + '/public'));

var port = process.env.PORT || 8000;
var host = "0.0.0.0";

app.listen(port, host, function () {
	console.log("Talker listening on host: " + host + " and port: " + port);
});
