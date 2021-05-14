// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp", (req, res)=>{
  let unixDate = new Date(Date.now())
    const dateObj = {
      unix: unixDate.valueOf(),
      utc: unixDate.toUTCString()
    }
    console.log(dateObj)
    return res.json(dateObj)
})

app.get("/api/timestamp/:date", (req, res)=>{
  if(/\d{5,}/.test(req.params.date)){
    let unixDateInt = parseInt(req.params.date)
    let dateObj = {
        unix: unixDateInt,
        utc: new Date(unixDateInt).toUTCString()
      }
    return res.json(dateObj)
  }

  const unixDate = new Date(req.params.date);
  if(unixDate.toString() !== "Invalid Date"){
  let dateObj = {
      unix: unixDate.valueOf(),
      utc: unixDate.toUTCString()
    }
    return res.json(dateObj)
  } else {
    return res.json({
      error: "Invalid Date"
    })
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});