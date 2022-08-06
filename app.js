
const https = require('https');
const express = require("express"); 
const app = express(); 

require('dotenv').config(); 

app.use(express.urlencoded({
    extended: true
  }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    

    const query = req.body.cityName;
    const appId = process.env.API_KEY; 
    const units = "imperial"

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${appId}&units=${units}`;
    https.get(url, (response) => {
        console.log(response.statusCode);
        // Below you are parsing the response data.
        response.on("data", (data) =>{

        
            // Parse temp/description/icon from the Api response. 
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp; 
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon

            //reponse
            res.write(`<h1>It is Current ${description}</h1>`);
            res.write(`<h1>The temperature in ${query} is ${temp} degrees.</h1>`);
            res.write (`<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">`)
            res.send();
        });
    });

});


//port listening
app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on Port 3000");
});