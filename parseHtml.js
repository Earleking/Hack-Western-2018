var striptags = require('striptags');
var sanitizeHtml = require('sanitize-html');

const request = require('request');
// console.log(text.replace('/([A-Z])\w+/', "*"));
function stuff(text) {
    // console.log(text);
    var text = striptags(text, [], "~");
    text = text.replace(/\s+/g,' ');
    // console.log(text);
    var texts = text.split("~");
    var finalText = "";
    for(var item of texts) {
        // console.log(item.split(.length);
        if(item.split(" ").length > 20) {
            finalText += item;
        }
    }
    console.log(finalText);
}

function stuff2(text) {
    var clean = sanitizeHtml(text, {
        // allowedTags: [],
      });
      clean = clean.replace(/\s+/g,' ');
    //   console.log(clean);
    stuff(clean);
}

var url = " ";
request.get(url, (err, res, data) => {
    stuff2(data);
});

