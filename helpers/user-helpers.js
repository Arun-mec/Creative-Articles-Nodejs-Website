var db=require('../config/connection')
var collection=require('../config/collections')
var objectId= require('mongodb').ObjectId
var bcrypt = require('bcrypt')
const { response } = require('express')

module.exports={
    addUser:(userDetails)=>{
        return new Promise(async (resolve,reject)=>{

            userDetails.password = await bcrypt.hash(userDetails.password,10)
                db.get().collection(collection.USER_COLLECTION).insertOne(userDetails).then(()=>{
                resolve(userDetails)
            })
        })
    },
    doLogin:(userDetails)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus =false;
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({email:userDetails.email})

            if (user){
                // console.log(userDetails)
                // console.log(user);
                bcrypt.compare(userDetails.password,user.password).then((status)=>{
                    console.log(status)
                if (status){
                    loginStatus=true;
                    response.user=user;
                    resolve(response)
                }else{
                    resolve({status:false})
                    console.log("login failed")

                }

            })
            }else{
                resolve({status:false})
                console.log("login failed")
            }
            
        })
    },
    getUserDetails:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let userDetails=db.get().collection(collection.USER_COLLECTION).findOne({_id:objectId(userId)})
            resolve(userDetails)
        })
        
    },
    getUserBlogs:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let blogs=db.get().collection(collection.BLOG_COLLECTION).findOne({userId:objectId(userId)})
            resolve(blogs)
        })
    }
}