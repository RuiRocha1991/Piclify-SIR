function getComments(photo){
    $.ajax({
        url:window.CONNECTION_NODE+'/commentsPhoto/getCommentsByPhoto',
        type: "get",
        data: {token:token, id_photo:photo} ,
        dataType:'json',
        success: function (res) {
            printComments(res)
        },
        error: function(errorMessage){
            alert(errorMessage);
        }
    });
}
function printComments(data){
    $('#comments .comments').remove();
    for(var i=0;i<data.length; i++){
        fillComments(data[i]);
    }
}
    
