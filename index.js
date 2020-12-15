const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const generatePassword = require('password-generator');

const app = express();

// Serve static files from the React app
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
let localTransporter;
let localMailOptions;
let localMailTo;
// localTransporter = require('./email').transporter;
// localMailOptions = require('./email').mailOptions;
// localMailTo = require('./email').mailTo;
const email = process.env.EMAIL || localMailOptions;
const mailTo = process.env.MAILTO || localMailTo;
const transporter =
	localTransporter ||
	nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: email,
			pass: process.env.MAILPASS,
		},
	});
if (transporter) {
	console.log('transporter exists.');
}

app.get('/api/test', (req, res) => {
	console.log('test route activated');
	res.send('you got the test route');
});

app.post('/api/sendemail', (req, res) => {
	console.log('sendemail request received.');
	try {
		console.log('req.body is: ', req.body);
		const { firstName, lastName, message } = req.body;
		if (!message) throw 'could not send email';
		transporter.sendMail(
			{
				from: email,
				to: mailTo,
				subject: `New message from Website visitor`,
				text: `First Name: ${firstName}, Last Name: ${lastName}, message: ${message}`,
			},
			function (error, info) {
				if (error) {
					console.log(error);
				} else {
					console.log('Email sent: ' + info.response);
				}
			}
		);
	} catch (err) {
		console.log(err);
		return res.status(422).send({ error: 'could not send email' });
	}
});

app.get('/api/passwords', (req, res) => {
	const count = 5;

	// Generate some passwords
	const passwords = Array.from(Array(count).keys()).map((i) => generatePassword(12, false));

	// Return them as json
	res.json(passwords);

	console.log(`Sent ${count} passwords`);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
