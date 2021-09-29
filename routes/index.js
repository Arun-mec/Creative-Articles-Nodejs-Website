var express = require('express');
var router = express.Router();
var pageHelpers = require('../helpers/page-helpers')
var objectId = require('mongodb').ObjectId

//middleware
const verifyLogin=(req,res,next)=>{
  if (req.session.loggedIn){
      next()
  }else{
      res.redirect('/user/signin')
  }
}


/* GET users listing. */
//  returning index page
router.get('/',async(req, res)=>{
  let user= req.session.user;
  let blogs= await pageHelpers.getBlogs()
  // console.log(blogs)
  res.render('pages/index',{blogs,user:user})
});

router.get('/view-all',async(req,res)=>{
  let user=req.session.user
  let blogs = await pageHelpers.getAllBlogs()
  res.render('pages/view-all',{blogs,user:user})
})

router.get('/view-blog/:id',async(req,res)=>{
  let user=req.session.user
  blogId = req.params.id;
  let blog = await pageHelpers.getBlogDetails(blogId)
  res.render('pages/view-one',{blog,user:user})
})


module.exports = router;
