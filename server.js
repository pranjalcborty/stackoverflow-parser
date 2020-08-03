var express = require("express");
var request = require("request");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var app = express();
var port = 36318;

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/top", function (req, res) {
  let tag = req.param("tag");
  getResponse("https://stackoverflow.com/questions/tagged/" + tag + "?tab=Votes", res);
});

app.get("/new", function (req, res) {
  let tag = req.param("tag");
  getResponse("https://stackoverflow.com/questions/tagged/" + tag + "?tab=Newest", res);
});

app.get("/details", function (req, res) {
  let url = req.param("url");

  request(url, function (e, r, body) {
    let dom = new JSDOM(body);
    let postData = dom.window.document.querySelector(".post-text");
    let user = dom.window.document.querySelector(".user-details > a");
    let acceptedAnswer = dom.window.document.querySelector(".accepted-answer .answercell .post-text");

    res.json({
      "user": user.textContent,
      "post": postData.innerHTML,
      "answer": acceptedAnswer == null ? "" : acceptedAnswer.innerHTML
    });
  });
});

function getResponse(url, res) {
  request(url, function (e, r, body) {
    let dom = new JSDOM(body);
    let allQues = dom.window.document.querySelectorAll(".summary > h3 > a");

    var response = [];
    allQues.forEach((e, i) => {
      if (i < 10) {
        response.push({
          "title": e.textContent,
          "url": "https://stackoverflow.com" + e.href
        });
      }
    })

    res.json(response);
  });
}

var listener = app.listen(port, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
