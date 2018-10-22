const express = require('express');
const mongoose = require('mongoose');

const app = express();

let server;

function startServer(dbUrl, port) {
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