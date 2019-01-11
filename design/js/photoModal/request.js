function getComments(photo){
    $.ajax({
        url:window.CONNECTION_NODE+'/commentsPhoto/getCommentsByPhoto',
        type: "get",
        data: {token:token, id_photo:photo} ,
        dataType:'json',
        success: function (res) {
            console.log(res)
        },
        error: function(errorMessage){
            alert(errorMessage);
        }
    });
}