function addComment(id, comment){
    $.ajax({
        async: false,
        url:window.CONNECTION_NODE+'/commentsPhoto/addComment',
        type: "post",
        data:{token:token, id_photo:id, text: comment},
        dataType: 'json',
        success:async function(res){
           $('#countComment'+res.photo).html(' '+ await getCountCommentsByPhoto(res.photo));
           $('#inputComment'+res.photo).val('');
        },
        error: function(errorMessage){
            alert(errorMessage);
        }
    });
}

async function getCountCommentsByPhoto(id){
    let total;
    await $.ajax({
        async: false,
        url:window.CONNECTION_NODE+'/commentsPhoto/getCountComments',
        type: "get",
        data:{token:token, id_photo:id},
        dataType: 'json',
        success: function(res){
            total=res[0].countComments;
        },
        error: function(errorMessage){
            alert(errorMessage);
        }
    });
    return total;
}