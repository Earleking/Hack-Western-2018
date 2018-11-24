const request = require("request");

const api_key = 'AIzaSyDANwPhX_FnU9N9O275zvCz78U4ta7oqDk';
const sites = ["www.nytimes.com",
            "www.wsj.com",
            "www.washingtonpost.com"];
            
async function getArticlesByTags(tags) {
    var query = "";
    for(var i in tags) {
        i.replace(" ", '+');
        query += i + "+";
    }
    for(var site in sites) {
        var url = `https://www.googleapis.com/customsearch/v1?q=${i}
        &cx=017124586449627225173%3Ag2noxtlpwrc&siteSearch=${site}&key=${api_key}`;
        request.get(url, (err, res, data) => {
            if(err)
                console.log(err);
            data = data["items"];
            var bestResult = data[0];
            var bestUrl = bestResult["link"];
            // verifySimilarity(bestUrl);
            // TODO do stuff with similarity
        });
    }
}

getArticlesByTags(["testing", "Testing2", "testting3"]);