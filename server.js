  
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
// TODO-Spin up the server
const server = app.listen(port, listening);
function listening(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`); 
}

//////////get route callback function
//take route "weather" handle all data from server and send it to client
app.get('/weather', function (req, res) {
        res.send(projectData);
        console.log(projectData);
});



///////////////post rout/////////////////////
////////app send data to server//////////////

app.post('/weather', postData);

function postData(req,res){
	console.log(req.body);
        
    projectData = {
    	date: req.body.date,
    	temp: req.body.temp,
    	country: req.body.country,
    	content: req.body.content	
    };

   // projectData.push(projectData);
   res.send(projectData);
   console.log(projectData);
}


