var db=require('../config/connection')
var collection=require('../config/collections')
var objectId= require('mongodb').ObjectId

module.exports={
    addArticle:(blogDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.BLOG_COLLECTION).insertOne(blogDetails).then((data)=>{
                var id = JSON.stringify(data.insertedId)
                resolve((id.slice(1,-1)))
            })
        })
    },
    getBlogs:()=>{
        return new Promise(async(resolve,reject)=>{
            let blogs= await db.get().collection(collection.BLOG_COLLECTION).find().toArray()
            resolve(blogs.slice(blogs.length-4,blogs.length-1))
        })
        },
    getAllBlogs:()=>{
        return new Promise(async(resolve,reject)=>{
            let blogs= await db.get().collection(collection.BLOG_COLLECTION).find().toArray()
            resolve(blogs)
        })
        },
    getBlogDetails:(blogId)=>{
        return new Promise(async(resolve,reject)=>{
            let blog= await db.get().collection(collection.BLOG_COLLECTION).findOne({_id:objectId(blogId)})

            // console.log(blog)
            resolve(blog)
        })
    },
    getAllTopicBlogs:(topic)=>{
        return new Promise(async(resolve,reject)=>{
            let blogs= await db.get().collection(collection.BLOG_COLLECTION).find({topic:topic}).toArray()
            console.log(blogs)
            resolve(blogs)
        })
    }
}