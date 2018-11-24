function getKeywords(data){
    var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
    var natural_language_understanding = new NaturalLanguageUnderstandingV1({
        'version': '2018-03-16',
        'iam_apikey': "QhHkZQwZquq60Je3wUq6yGO_S23J3NjdH-5qtHO-mpMX",
        'url': "https://gateway-wdc.watsonplatform.net/natural-language-understanding/api"
    });

    var parameters = {
        'text': data,
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
            //console.log(JSON.stringify(response.keywords.length));

            for(var i = 0; i < response.keywords.length; i ++){
                if(JSON.stringify(response.keywords[0].relevance) >= 0.6){
                    keywords_list.push(JSON.stringify(response.keywords[i].text));
                    console.log(keywords_list[i]);
                }
            }
    });

    return keywords_list;
}