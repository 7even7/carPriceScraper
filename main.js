var cheerio = require('cheerio');
var promise = require('bluebird');
var fetch = require('node-fetch');
var seedURL = 'http://www.nettiauto.com/mercedes-benz/c?id_vehicle_type=1&id_car_type=4&id_fuel_type=1&id_gear_type=3&yfrom=2014';

function getCarPageHTML (url){
    fetch(url)
    
}

var page = fetch(seedURL);

page.then((content)=>{
    return content.text();
}).then(createCarObjectsFromResultPage)


function createCarObjectsFromResultPage (body){
    var $ = cheerio.load(body);
    $('div.data_box').each(function(i, listItem){
          // Scrape URL and price from car list.
          var listItemRoot = listItem.parent.parent;
          var URL=$('.childVifUrl.tricky_link', listItemRoot).attr('href');
          console.log(URL);
    })
}