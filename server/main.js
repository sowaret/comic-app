require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

mongoose
	.connect(process.env.DB_ROUTE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		const app = express()
			.use(cors())
			.use('/media', express.static(process.env.MEDIA_ROOT))
			.use(express.json())
			.use('/api/v1', routes);

		app.listen(process.env.API_PORT, () =>
			console.log(
				`\nConnection successful, listening on port ${process.env.API_PORT}.`
			)
		);
	})
	.catch(err => console.log('Could not connect to database:', err.toString()));

// Handle errors after initial connection
mongoose.connection.on(
	'error',
	console.error.bind(console, 'MongoDB connection error:')
);
