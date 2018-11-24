function getKeywords(data, title){
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
            },
            'concepts':{
                'limit': 1
            },
            'relations':{}
        }
    }

    var parametersTitle = {
        'text': title,
        'features':{
            'keywords':{
                'limit': 2
            } 
        }
    }

    var keywords_list = [];
    natural_language_understanding.analyze(parametersTitle, function (err, response) {
        if (err)
            console.log('error:', err);
        else
            console.log(JSON.stringify(response, null, 2));
            for(var i = 0; i < response.keywords.length; i ++){
                if(JSON.stringify(response.keywords[0].relevance) >= 0.6){
                    keywords_list.push(JSON.stringify(response.keywords[i].text));
                    console.log(keywords_list[i]);
                }
            }
            
    });
    natural_language_understanding.analyze(parameters, function (err, response) {
        if (err)
            console.log('error:', err);
        else
            console.log(JSON.stringify(response, null, 2));
            keywords_list.push(JSON.stringify(response.entities[0].text));
            keywords_list.push(JSON.stringify(response.concepts[0].text));

            for(var i = 0; i < response.keywords.length; i ++){
                if(JSON.stringify(response.keywords[0].relevance) >= 0.6){
                    keywords_list.push(JSON.stringify(response.keywords[i].text));
                    console.log(keywords_list[i]);
                }
            }
            
    });

    return keywords_list;
}

var data = "The error came to light after Jefferson County Sheriff's Office investigators and crime scene experts spoke to witnesses and examined evidence, police said."
"Investigators now believe that more than two individuals were involved in the initial altercation, Rector said. This information indicates that there is at least one gunman still at large."
"The officer involved in the shooting is on administrative leave pending an investigation, police said."
"The Jefferson County district attorney informed Hoover police Friday that the Alabama Law Enforcement Agency will take over the lead role in the shooting investigation from the county sheriff's office, Rector said. Hoover police will assist and cooperate fully in that inquiry and will conduct an internal but separate investigation of the officer-involved shooting, he said.";

var title = "Alabama mall gunman still at large after police say armed man killed by officer likely did not fire shots";

getKeywords(data, title);
