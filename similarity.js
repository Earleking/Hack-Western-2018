var e = ['a','b','c', 'd', 'e', 'f'];
var d = ['b','b','b','g','d','d'];

function similarityScore(a, b)
{

    // See how many unique keywords there are overall
    var c = [];
    c.push(...a);
    c.push(...b);


    console.log(c);
    var counts = {};
    // See how many keywords are common between both
    var inBoth = {};

    for(var i = 0; i < c.length; i++)
    {
        counts[c[i]] = 1;
    }

    for(var i = 0; i < a.length; ++i)
    {
        inBoth[a[i]] = 1;
    }

    var overall = Object.keys(counts).length; // number of unique keywords across both articles.

    for(var i = 0; i < b.length; i++)
    {
        if(inBoth[b[i]])
            inBoth[b[i]] += 1;
    }

    var sharedKeywords = 0;
    for(var i = 0; i < Object.keys(inBoth).length; i++)
    {
        if(inBoth[Object.keys(inBoth)[i]] >= 2)
        {
            console.log("Found a shared keyword, " + Object.keys(inBoth)[i]);
            sharedKeywords++;
        }
    }

    
    
    console.log(sharedKeywords + ' ' + overall);

    console.log('Similarity by keywords: ' + sharedKeywords/overall);
}

similarityScore(e,d);