const express = require('express');
const path = require('path');
const app = express();

// Serve static files....
app.use(express.static(__dirname + '/dist/basePoject'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/basePoject/index.html'));
});

// default Heroku PORT
//app.listen(process.env.PORT || 80);
app.listen(process.env.PORT || 80, function(){
  console.log("Prueba Salida: "+ this.address().port +"/"+app.settings.env)
});
