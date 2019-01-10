async function getCountLikesByPhoto(id){
    let total;
    await $.ajax({
        async: false,
        url:window.CONNECTION_NODE+'/likesPhoto/getCountLikes',
        type: "get",
        data:{token:token, id_photo:id},
        dataType: 'json',
        success: function(res){
            total =res[0].countLikes;
        },
        error: function(errorMessage){
            alert(errorMessage);
        }
    });
    return total;
}

async function getIsLikePhoto(id){
    let isLike;
    await $.ajax({
        async: false,
        url:window.CONNECTION_NODE+'/likesPhoto/isLikePhoto',
        type: "get",
        data:{token:token, id_photo:id},
        dataType: 'json',
        success: function(res){
            isLike =res.length>0 ? true:false;
        },
        error: function(errorMessage){
            alert(errorMessage);
        }
    });
    return isLike;
}

async function addLike(id){
    await $.ajax({
        async: false,
        url:window.CONNECTION_NODE+'/likesPhoto/addLike',
        type: "post",
        data:{token:token, id_photo:id},
        dataType: 'json',
        success: function(res){
            if(res != null || !res.empty){
                success=true;
            }
        },
        error: function(errorMessage){
            alert(errorMessage);
        }
    });
    return success;
}

async function removeLike(id){
    var success=false;
    await $.ajax({
        async: false,
        url:window.CONNECTION_NODE+'/likesPhoto/removeLike',
        type: "post",
        data:{token:token, id_photo:id},
        dataType: 'json',
        success: function(res){
            if(res != null || !res.empty){
                success=true;
            }
        },
        error: function(errorMessage){
            alert(errorMessage);
        }
    });
    return success;
}