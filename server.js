const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const unirest = require("unirest");
const API_KEY = "8e1981a3-1350-4909-af57-0235db7eeb28";
// import path library
const path = require('path');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/associations/:word', (req, res) => {
	const word = req.params.word;
	const request = unirest.get(`https://api.wordassociations.net/associations/v1.0/json/search?apikey=${API_KEY}&lang=en&text=${word}`)
	.then(response => {
		const results = response.body.response[0].items || []; // grab array of results
		console.log(`Num results=${results.length}`);
		res.json(results);
	})
	.catch(error => {
		console.log(`error=${error}`);
		res.json({status:"Error", message: `${error}`});
	});
});

// for any request that doesn't match one above, send back React's index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });

app.listen(port, () => {
  console.log(`word-app listening on port ${port}`);
});