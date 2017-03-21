const mongoClient = require('mongodb').MongoClient;
const MongoConnectionString = 'mongodb://crawler:crawler1!@ds023452.mlab.com:23452/crawlerdata'; 


function open(){
    return mongoClient.connect(MongoConnectionString);
}

function close(db){
    //Close connection
    if(db){
        db.close();
    }
}

let db = {
    open : open,
    close: close
}

module.exports = db;