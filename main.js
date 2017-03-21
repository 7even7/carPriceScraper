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
    var lkm = 0
    $('div.data_box').each(function(i, listItem){
          // Scrape URL and price from car list.
          var listItemRoot = listItem.parent.parent;
          var URL=$('.childVifUrl.tricky_link', listItemRoot).attr('href');
          var scrapedCar = new Car(URL);
          scrapedCar._id=URL.split('/')[URL.split('/').length-1];
          // update car-object with rest of the data
          var price = $('.main_price',this).text().replace(/\D/g,'')
          scrapedCar.priceHistory.unshift([price, new Date().toJSON()]);
          scrapedCar.engine=$('.eng_size', this).text().replace(/[^0-9\.]+/g,""); 
          // Make and model need to be parsed from the same string
          var makeModel = $('.make_model_link', this).text().split(' ');
          scrapedCar.make=makeModel[0];
          scrapedCar.model=makeModel[1];
          // Seller info
          scrapedCar.location=$('.list_seller_info',this).children('b').text();
          scrapedCar.seller=$('.list_seller_info',this).children('span').text()
          
          // Details parsed from List items. Sometimes one of the info pieces is missing and therefore this works only if all 4 are present.
          var otherInfo = $(this).find('li')
          if (otherInfo.length==4){
            scrapedCar.buildYear=otherInfo[0].children[0].data;
            scrapedCar.milage=otherInfo[1].children[0].data.replace(/\D/g,'');
            scrapedCar.fuelType=otherInfo[2].children[0].data;
            scrapedCar.transmission=otherInfo[3].children[0].data;
          console.log("auto nro: " + lkm)
          console.log(scrapedCar);
          lkm++;
          }
    })
}



// Declarations
function Car(URL){
  this.URL=URL;
  this._id=null;
  this.siteID = "Nettiauto";
  this.make=null;
  this.model=null;
  this.buildYear=null;
  this.plateNumber=null;
  this.drive=null;
  this.transmission=null;
  this.engine=null;
  this.fuelType=null;
  this.milage=null;
  this.priceHistory = [];
  this.location="";
  this.seller="";
}