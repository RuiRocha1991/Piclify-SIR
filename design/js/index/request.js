async function getMyFollowed(){
    var myFollowed;
    await $.ajax({
        url:window.CONNECTION_NODE+'/follower/getMyFollowed',
        type: "get",
        data: { token:token} ,
        dataType:'json',
        success: function (res) {
            myFollowed=res;
        },
        error: function (errorMessage) {
            console.log(errorMessage);
            if(errorMessage.status==401){
                logout();
            }
        }
    });
    return myFollowed;
}

async function getPhotosMyFollowedAndMY(){
    var photos;
    await $.ajax({
        url:window.CONNECTION_NODE+'/follower/getPhotosMyFollowedAndMY',
        type: "get",
        data: { token:token} ,
        dataType:'json',
        success: function (res) {
            photos=res;
        },
        error: function (errorMessage) {
            console.log(errorMessage);
            if(errorMessage.status==401){
                logout();
            }
        }
    });
    return photos;
}