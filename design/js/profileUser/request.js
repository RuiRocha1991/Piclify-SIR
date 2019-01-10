var user;
function getDetailsUser(id){
    $.ajax({
        url:window.CONNECTION_NODE+'/user/getDetailsUserById',
        type: "get",
        data: {token:token, id_user: id} ,
        dataType:'json',
        success: function (res) {
            user=res[0];
            fillProfileDetails(res[0]);
        },
        error: function (errorMessage) {
            logout();
            document.location.href = 'login.html';
        }
    });
}

function getNumberFollowers(id){
    $.ajax({
        url:window.CONNECTION_NODE+'/user/getFollowers',
        type: "get",
        data: {id_user: id, token:token} ,
        dataType:'json',
        success: function (res) {
            $('#lb-followers').text(res[0].followers);
        },
        error: function (errorMessage) {
            alert(errorMessage);
        }
    });
}

function getListAlbums(id){
    $.ajax({
        url:window.CONNECTION_NODE+'/album/getListAlbums',
        type: "get",
        data: {id_user: id, token:token},
        dataType:'json',
        success: function (res) {
            ListAlbums=res;
            fillListAlbums(res);
        },
        error: function (errorMessage) {
            alert(errorMessage);
        }
    });
}

function getListGroups(id){
    $.ajax({
        url:window.CONNECTION_NODE+'/groupUser/getListGroupsByUser',
        type: "get",
        data: {user: id,token:token} ,
        dataType:'json',
        success: function (res) {
            getGroupsDetailsByUser(res);
        },
        error: function (errorMessage) {
            alert(errorMessage);
        }
    });
}

async function getGroupsDetailsByUser(res){
    $('#listGroups li').remove();
    var list= new Array();
    for(var i=0; i<res.length;i++){
       await $.ajax({
            url:window.CONNECTION_NODE+'/group/getListGroupById',
            type: "get",
            data: {id_group: res[i].idGroup, token:token} ,
            dataType:'json',
            success: function (res) {
                list.push(res[0]);
            },
            error: function (errorMessage) {
                alert(errorMessage);
            }
        });
    }
    fillListGroups(list);
}

async function verifyIsFollowed(id){
    let result;
    await $.ajax({
        url:window.CONNECTION_NODE+'/follower/verifyFollower',
        type: "get",
        data: {id_user: id,token:token} ,
        dataType:'json',
        success: function (res) {
            result=res;
        },
        error: function (errorMessage) {
            alert(errorMessage);
        }
    });
    return result;
}

function addFollower(){
    window.$_GET = new URLSearchParams(location.search);
    var user = $_GET.get('id');
    $.ajax({
        url:window.CONNECTION_NODE+'/follower/addFollower',
        type: "post",
        data: {id_user: user,token:token} ,
        dataType:'json',
        success: async function (res) {
            getNumberFollowers(res.id_user);
            var result = await verifyIsFollowed(res.id_user);
            if(result[0].isFollower== "1"){
                $('#btn-follower').html('Do not Follow');
                getPhotosByIdUser(res.id_user,true );
            }
        },
        error: function (errorMessage) {
            alert(errorMessage);
        }
    });
}

function removeFollower(){
    window.$_GET = new URLSearchParams(location.search);
    var user = $_GET.get('id');
    $.ajax({
        url:window.CONNECTION_NODE+'/follower/removeFollower',
        type: "post",
        data: {id_user: user,token:token} ,
        dataType:'json',
        success: async function (res) {
            getNumberFollowers(res.id_user);
            var result = await verifyIsFollowed(res.id_user);
            if(result[0].isFollower== "0"){
                $('#btn-follower').html('Follow');
                getPhotosByIdUser(res.id_user,false );
            }
           
        },
        error: function (errorMessage) {
            alert(errorMessage);
        }
    });
}

function getPhotosByIdUser(id, isFollower){
    $.ajax({
        url:window.CONNECTION_NODE+'/photo/getPhotosToVisitorByUser',
        type: "get",
        data: {id_user: id,token:token, isFollower:isFollower} ,
        dataType:'json',
        success: function (res) {
            fillCardPhotos(res, user);
        },
        error: function (errorMessage) {
            alert(errorMessage);
        }
    });
}

function getPhotosToVisitorByAlbum(album){
    $.ajax({
        url:window.CONNECTION_NODE+'/albumsPhoto/getPhotosToVisitorByAlbum',
        type: "get",
        data: {token:token, id_album: album},
        dataType: 'json',
        success: async function(res) {
            var photosInfo = await getInfoPhotosById(res);
            fillCardPhotos(photosInfo, user);
        },
        error: function(errorMessage){
            alert(errorMessage);
        }
    });
}

async function getInfoPhotosById(data){
    let isFollower = await verifyIsFollowed(user.id_user);
    var photos = [];
    for(var i=0;i<data.length; i++){
        await $.ajax({
            url:window.CONNECTION_NODE+'/photo/getPhotosToVisitorById',
            type: "get",
            data: {token:token, id_photo: data[i].photo, isFollower: isFollower},
            dataType: 'json',
            success: function(res) {
                if(res.length >0){
                    photos.push( res[0]);
                }
            },
            error: function(errorMessage){
                alert(errorMessage);
            }
        })
    }
    return photos
}

