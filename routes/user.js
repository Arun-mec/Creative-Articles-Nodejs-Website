var express = require('express');
var router = express.Router();
var userHelpers = require('../helpers/user-helpers')
const { application } = require('express');


partialsCond={partials:true}
// middleware for checking partials


//middleware
const verifyLogin=(req,res,next)=>{
    if (req.session.loggedIn){
        next()
    }else{
        res.redirect('/user/signin')
    }
}



// sign up action
router.get('/signup',(req,res)=>{
    res.render('user/signup',partialsCond);
})

//signing using google
router.get('/email-signup',(req,res)=>{
    res.render('user/email-signup',partialsCond)
})


//retrieving user data
router.post('/email-signup',(req,res)=>{
    userHelpers.addUser(req.body).then((userDetails)=>{
        req.session.loggedIn=true
        req.session.user=userDetails
        // console.log(userDetails)
        res.render('user/profile',{userDetails:userDetails,partials:true,alert:true})
    })
})

router.get('/signin',(req,res)=>{
    if(req.session.loggedIn){
        res.redirect('/')
    }else{
        
        res.render('user/signin',{"Error":req.session.loginError,partials:true})
        req.session.loginError=false
  }
}) 

router.post('/signin',(req,res)=>{
    userHelpers.doLogin(req.body).then((response)=>{
        if (response.status){
            req.session.loggedIn=true
            req.session.user=response.user
            res.redirect('/')
        }else{
            // req.session.loginError="Invalid username and password"
            res.redirect('/user/signin')
        }
    })
})

router.get('/signout',(req,res)=>{
    req.session.destroy();
    res.redirect('/')
})

//userProfile
router.get('/profile/:id', async(req,res)=>{
    let userId = req.params.id;

    let userDetails = await userHelpers.getUserDetails(userId)
    let blogs = await userHelpers.getUserBlogs(userId)
    console.log(blogs)

    console.log
    // console.log(userDetails)
    // console.log(userDetails)
    res.render('user/profile',{user:true,userDetails:userDetails,blogDetails:blogs,partials:true})
})

module.exports=router