const mongoClient = require('mongodb').MongoClient;
const MongoConnectionString = 'mongodb://crawler:crawler1!@ds023452.mlab.com:23452/crawlerdata'; 


function open(){
    return mongoClient.connect(MongoConnectionString);
}

function openCollection(){
    return mongoClient.connect(MongoConnectionString)
    .then((db)=>{
        return db.collection('test');
    })
}


function close(db){
    //Close connection
    if(db){
        db.close();
    }
}

let db = {
    open : open,
    close: close,
    openCollection: openCollection
}

module.exports = db;