const config = require('./config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/client/views/');

// Routers

app.use('/styles', express.static('./client/styles'));
app.use('/scripts', express.static('./client/scripts'));
app.use(require('./client/router-client'));

app.use('/users', require('./api/router-users'));
app.use('/auth', require('./api/router-auth'));

// Server Controls

let server;

function startServer(dbUrl = config.DB_URL, port = config.PORT) {
	console.log('Attempting to run Grill-Booking server...');
	return new Promise((resolve, reject) => {
		mongoose.connect(dbUrl, err => {
			if(err)
				return reject();
			server = app.listen(port, () => {
					console.log(`Grill-Booking server is listening on port ${port}.`);
					resolve();
				})
				.on('error', err => {
					mongoose.disconnect();
					reject(err);
				});
		});
	});
}

function stopServer() {
	console.log('Closing Grill-Booking server...');
	return mongoose.disconnect()
		.then(() => 
			new Promise((resolve, reject) =>
				server.close(err => {
					if(err)
						return reject(err);
					console.log("Good bye!");
					resolve();
				})
			)
		);
}

if(require.main === module)
	startServer();

module.exports = { app, startServer, stopServer };