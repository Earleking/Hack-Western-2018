var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
    'version': '2018-03-16',
    'iam_apikey': "QhHkZQwZquq60Je3wUq6yGO_S23J3NjdH-5qtHO-mpMX",
    'url': "https://gateway-wdc.watsonplatform.net/natural-language-understanding/api"
});

var parameters = {
    'text': 'IBM is an American multinational technology company headquartered in Armonk, New York, United States, with operations in over 170 countries.',
    'features': {
        'entities': {
        },
        'keywords': {
            'limit': 5
        }
    }
}

var keywords_list = [];
natural_language_understanding.analyze(parameters, function (err, response) {
    if (err)
        console.log('error:', err);
    else
        console.log(JSON.stringify(response.keywords[0].text));

        for(var i = 0; i < response.length; i ++){
            if(response.keywords[i].relevance >= 0.6){
                keywords_list.push(response.keywords[i].text);
                console.log(response.keywords[i].text);
            }
        }

        console.log(keywords_list[0]);
       for(var i = 0; i < keywords_list.length; i++){
            console.log(keywords_list[i]);
        };
});