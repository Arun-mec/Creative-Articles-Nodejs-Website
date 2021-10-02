function addLike(blogId){
    likeCount=parseInt(document.getElementById(blogId).innerHTML)   
    $.ajax({
        url:'/pages/add-like',
        method:'post',
        data:{
            blogId:blogId
        },
        
        success:(response)=>{
            if (response.status){
                likeCount=likeCount+1
                document.getElementById(blogId).innerHTML=likeCount
                location.reload()
            }
        }
    })  
}

function doLogin(){
    url=window.location.href
    $.ajax({
        url:'/pages/verify-login',
        method:'post',
        data:{
            url:url
        },
        success:(response)=>{
            if(response.status){
                // alert("Im her")
                console(response)
            }}
    })  
    
}