var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
    'version': '2018-03-16',
    'iam_apikey': "QhHkZQwZquq60Je3wUq6yGO_S23J3NjdH-5qtHO-mpMX",
    'url': "https://gateway-wdc.watsonplatform.net/natural-language-understanding/api"
});


const request = require("request");

const api_key = 'AIzaSyDANwPhX_FnU9N9O275zvCz78U4ta7oqDk';
const sites = ["www.nytimes.com",
    "www.wsj.com",
    "www.washingtonpost.com"];

function run(url) {
    fetchWebsite(url);
}

function fetchWebsite(url) {
    var Diffbot = require('diffbot').Diffbot
    var diffbot = new Diffbot('3a1e3c50b771dc4c9f95500511117cba')

    diffbot.article({
        uri: url
    }, function (err, response) {
        // console.log(response);
        //console.log(response.objects[0].tags);
        var data = response["objects"][0]["text"];
        var date = response["objects"][0]["date"];
        getKeywords(data, (tags) => {
            getArticlesByTags(tags, date);
        });
    });
};

function getKeywords(data, callback) {
    var parameters = {
        'text': data,
        'features': {
            'entities': {
            },
            'keywords': {
                'limit': 5
            }
        }
    };

    var keywords_list = [];
    natural_language_understanding.analyze(parameters, function (err, response) {
        if (err)
            console.log('error:', err);
        else
            //console.log(JSON.stringify(response.keywords.length));

            for (var i = 0; i < response.keywords.length; i++) {
                if (JSON.stringify(response.keywords[0].relevance) >= 0.6) {
                    keywords_list.push(JSON.stringify(response.keywords[i].text));
                    console.log(keywords_list[i]);
                }
            }
        if (callback) {
            callback(keywords_list);
        }
    });

    // return keywords_list;
}


async function getArticlesByTags(tags, date, callback) {
    var query = "";

    // for loop to convert tags into query string.
    // ATTENTION: I made a change here so 'United States' becomes 'United+States' in the query string.
    for (var i of tags) {
        x = i.replace(" ", '+');
        query += x + "+";
    }

    // eliminate null terminator.
    query = query.substring(0, query.length - 1);

    // start date for reference
    var startDate = new Date(date);
    var endDate = new Date(date)

    // make date
    date = transformDate(date);

    startDate.setDate(startDate.getDate() - 7);
    startDate = transformDate(startDate.toString());

    endDate.setDate(endDate.getDate() + 7);
    endDate = transformDate(endDate.toString());

    // construct search queries for our chosen sites.
    // These are credible sites that we'll use to ascertain the accurate consensus.
    for (var site of sites) {
        var url = `https://www.googleapis.com/customsearch/v1?q=${query}
        &cx=017124586449627225173%3Ag2noxtlpwrc&siteSearch=${site}
        &sort=date:r:${startDate}:${endDate}&key=${api_key}`;
        console.log(url);

        // removed return statement here.

        request.get(url, (err, res, data) => {
            if (err)
                console.log(err);
            data = JSON.parse(data);
            data = data["items"];
            var bestResult = data[0];
            // var bestUrl = bestResult["link"];

            console.log(bestResult);
            // verifySimilarity(bestUrl);
            // TODO do stuff with similarity

        });
    }
}

const months = {
    "Jan": 1,
    "Feb": 2,
    "March": 3,
    "April": 4,
    "May": 5,
    "June": 6,
    "July": 7,
    "Aug": 8,
    "Sept": 9,
    "Oct": 10,
    "Nov": 11,
    "Dec": 12
}

function transformDate(date) {
    date = date.substring(4); // start from the day of the month
    console.log(date);
    var vals = date.split(" ");
    var finalDate = "";
    finalDate += vals[2]; // this is the year -- 2018
    console.log(vals[0]); // this prints the three-character month
    finalDate += months[vals[0]]; // append the numerical month.
    finalDate += vals[1]; // append the day of the the month.
    return finalDate;
}
console.log(transformDate("Fri Nov 23 2018 16:49:00 GMT-0500"));
getArticlesByTags(['Climate', 'United States'], "Fri Nov 23 2018 16:49:00 GMT-0500");

// run('https://www.washingtonpost.com/energy-environment/2018/11/23/major-trump-administration-climate-report-says-damages-are-intensifying-across-country/?fbclid=IwAR3EhosV4TexFZJ4HTvm80k8fIbciRsQtIbF3apTin_2fKVZmFFHv4bK6q8&noredirect=on&utm_term=.8ec6789a966d');