const { ObjectId } = require('bson');
var objectId =require('mongodb').ObjectId
var express = require('express');
var pageHelpers = require('./helpers/page-helpers')
  

var router = express.Router();
var pageHelpers = require('../helpers/page-helpers')


const verifyLogin=(req,res,next)=>{
    if (req.session.loggedIn){
        next()
    }else{
        res.redirect('/user/signin')
    }
}

router.get('/addarticle',verifyLogin,(req,res)=>{  
    user=req.session.user._id;
    // console.log(user)
    
    res.render('pages/addarticle',{user})
})

router.post('/addarticle/:id',(req,res)=>{
    // console.log(req.files)
    var date = new Date()
    userId = req.params.id
    admin_object={
        userId:objectId(userId),
        likes :0,
        comments:[],
        admin_status:false,
        date: date.toISOString().slice(0,10)
        
    } 
    blogDetails = Object.assign(req.body,admin_object)
    // console.log(blogDetails)
    pageHelpers.addArticle(blogDetails).then((id)=>{
        let imageFile = req.files.image
        imageFile.mv('../Blog Website/public/blog-images/'+id+'.jpg', function(err) {
            if (err)
              return res.send(err);
            res.redirect('/');
          });
    })
})

router.get('/travel',async(req,res)=>{
    let topic="Travel"
    let blogs = await pageHelpers.getAllTopicBlogs(topic)
    res.render('pages/view-topic',{blogs})
})
router.get('/food',async(req,res)=>{
    let topic="Food"
    let blogs = await pageHelpers.getAllTopicBlogs(topic)
    res.render('pages/view-topic',{blogs})
})
router.get('/culture',async(req,res)=>{
    let topic="Culture"
    let blogs = await pageHelpers.getAllTopicBlogs(topic)
    res.render('pages/view-topic',{blogs})
})
router.get('/music',async(req,res)=>{
    let topic="Music"
    let blogs = await pageHelpers.getAllTopicBlogs(topic)
    res.render('pages/view-topic',{blogs})
})
router.get('/literature',async(req,res)=>{
    let topic="Literature"
    let blogs = await pageHelpers.getAllTopicBlogs(topic)
    res.render('pages/view-topic',{blogs})
})
router.get('/art',async(req,res)=>{
    let topic="Art"
    let blogs = await pageHelpers.getAllTopicBlogs(topic)
    res.render('pages/view-topic',{blogs})
})

router.post('/add-like',verifyLogin,(req,res)=>{
    blogId = req.body.blogId
    pageHelpers.addLike(blogId).then((response)=>{
        res.json({status:true})
    })
})

router.post('/verify-login',(req,res)=>{
    
    if (req.session.loggedIn){
        console.log("True");
    }else{
        res.json({status:true,url:req.body.url})
        console.log("False");
    }
})

router.post('/add-comment',verifyLogin,(req,res)=>{
    // console.log(req.body);
    user = req.session.user
    pageHelpers.addComment(req.body,user).then((response)=>{
        res.json({status:true})
    })
})
module.exports=router