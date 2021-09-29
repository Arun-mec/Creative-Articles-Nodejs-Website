function addLike(blogId){
    $.ajax({
        url:'/pages/add-like',
        data:{
            blogId:blogId
        }
    })
}