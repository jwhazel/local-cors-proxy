const app = require("express")();
const cors = require("cors");
const axios = require("axios");
const port = 1234;

app.use(cors());

app.all("/", function(req, res, next) {
  //Accept 2 query params: q and json
  let query = req.query.q || "";
  let json = req.query.json || "false";

  //Coerce to JSON header if it looks like the request is JSON
  let isJSON =
    query.toLowerCase().includes("json") || json.toLowerCase() == "true";

  //Request the resource and send it (cors package takes care of setting cors header)
  axios(req.query.q).then(data => {
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
