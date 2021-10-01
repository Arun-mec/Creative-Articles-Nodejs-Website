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

