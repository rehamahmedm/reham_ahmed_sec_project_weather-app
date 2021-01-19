/* Global Variables */
const extradata=[];
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather/?';//zip=" + user_zip.value + "&appid={API key}';
const apiKey = 'f1c66e766c894d8606a32b4ff2ac256e';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e){
     const user_zip = document.getElementById('zip').value;
     const content = document.getElementById('feelings').value;
     
  if(user_zip != ""){
       
    weatherdemo(baseURL, user_zip, apiKey)
     .then(function(response){
     	//response => {console.log(response.main.temp, response.sys.country);
     	//extract data from object returns
     	postData('/weather', {date:d, temp:response.main.temp, country:response.sys.country, content:content});
      retrieveData();
    })
}else{alert("please enter zip code");}
} 

/* Function to GET Web API Data*/
const weatherdemo = async (baseURL, user_zip, apiKey)=>{
  const myrequest = baseURL+"zip="+user_zip+"&appid="+apiKey;
  const res = await fetch(myrequest)
  try {
       const data = await res.json();
       if (data.cod == 404){alert("Please enter a valid zip code !!");}
       return data;
     }  
  catch(error) {
     console.log("error", error);
    // appropriately handle the error
  }
}

/* Function to POST data */
//send object data to server
const postData = async ( url = '', data = {})=>{
    //console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });
      try {
         const newData = await response.json();
         console.log(newData);
      }catch(error) {
         console.log("error", error);
      }
  }



/* Function to GET Project Data */
//display all the data on browser user interface
const retrieveData = async () =>{ 
  const request = await fetch('/weather');
  try {
  // Transform into JSON
  const newData = await request.json();
  //update interface for user by data came from server
  document.getElementById("date").innerText  = newData.date;
  document.getElementById("temp").innerText  = newData.temp;
  document.getElementById("country").innerText  = newData.country;
  document.getElementById("content").innerText  = newData.content;

  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}