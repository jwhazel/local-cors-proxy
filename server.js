const app = require("express")();
const cors = require("cors");
const axios = require("axios");
const port = 1234;

//Enable cors
app.use(cors());

app.all("/", function(req, res, next) {
  //Accept 2 query params: q and json
  let q = req.query.q || "";
  let json = req.query.json || "false";

  //Coerce to JSON header if it looks like the request is JSON
  let isJSON =
    q.toLowerCase().includes("json") || json.toLowerCase() == "true";

  //Request the resource and send the response back
  axios(q).then(data => {
    if (isJSON) {
      res.json(data.data);
    } else {
      res.send(data.data);
    }
  });
});

app.listen(port, function() {
  console.log(`CORS-enabled web server listening on port ${port}`);
});
