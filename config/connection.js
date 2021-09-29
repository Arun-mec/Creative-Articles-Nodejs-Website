const mongoClient=require('mongodb').MongoClient
const state={
    db:null
}

module.exports.connect=(done)=>{
    const url='mongodb://localhost:27017'
    const dbname='blog-site'

    mongoClient.connect(url, function(err,data){
        if (err) return err
        state.db=data.db(dbname)
        done()
    })
}

module.exports.get=()=>{
    return state.db
}