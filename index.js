var Diffbot = require('diffbot').Diffbot
var diffbot = new Diffbot('3a1e3c50b771dc4c9f95500511117cba')

diffbot.article({uri: 'https://www.washingtonpost.com/energy-environment/2018/11/23/major-trump-administration-climate-report-says-damages-are-intensifying-across-country/?fbclid=IwAR3EhosV4TexFZJ4HTvm80k8fIbciRsQtIbF3apTin_2fKVZmFFHv4bK6q8&noredirect=on&utm_term=.8ec6789a966d'}, function(err, response) {
  console.log(response);
  //console.log(response.objects[0].tags);

  if (response.media)
    console.log(JSON.stringify(response.media));
});