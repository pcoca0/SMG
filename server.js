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
app.listen(process.env.PORT || 8080);
app.listen(port, function(){
  console.log("Prueba Salida: "+port+"/"+path)
});
