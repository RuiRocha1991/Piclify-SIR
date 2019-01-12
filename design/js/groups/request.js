function getPhotoById(id){
    var photo;
    $.ajax({
        async:false,
        url:window.CONNECTION_NODE+'/photo/getPhotoById',
        type: "get",
        data:{token:token, id_photo:id},
        dataType: 'json',
        success: function(res){
            photo= res[0];
        },
        error: function(errorMessage){
            alert(errorMessage);
        }
    })
    return photo
}

function getPhotosByGroup(group){
    $.ajax({
        url:window.CONNECTION_NODE+'/groupsPhoto/getPhotosByGroup',
        type: "get",
        data: {token:token, id_group: group},
        dataType: 'json',
        success: async function(res) {
            var photosInfo = await getInfoPhotosToGroup(res)
            getCountLikesToGroup(photosInfo);
        },
        error: function(errorMessage){
            alert(errorMessage);
        }
    })
}

function getInfoPhotosToGroup(data){
    var photos = []
    for(var i=0;i<data.length; i++){
        photos.push(getPhotoById(data[i].photo))
    }
    return photos
}

function getCountLikesToGroup(data){
    for(var i=0; i<data.length; i++){
        $.ajax({
            async: false,
            url:window.CONNECTION_NODE+'/likesPhoto/getCountLikes',
            type: "get",
            data:{token:token, id_photo:data[i].id_photo},
            dataType: 'json',
            success: function(res){
                var result={data:data[i], countLikes : res[0].countLikes};
                getCountComments(result);
            },
            error: function(errorMessage){
                alert(errorMessage);
            }
        })
    }
    initFunctionsCard()
}

function getCountComments(data){
    $.ajax({
        async: false,
        url:window.CONNECTION_NODE+'/commentsPhoto/getCountComments',
        type: "get",
        data:{token:token, id_photo:data.data.id_photo},
        dataType: 'json',
        success:async function(res){
            var result ={data:data.data, countLikes : data.countLikes, countComments: res[0].countComments};
            addCardToGroup(result); 
        },
        error: function(errorMessage){
            alert(errorMessage);
        }
    })
}

async function getDetailsUser(id){
    var user
    await $.ajax({
        url:window.CONNECTION_NODE+'/user/getDetailsUserById',
        type: "get",
        data: {token:token, id_user: id} ,
        dataType:'json',
        success: function (res) {
            user = res[0]
        },
        error: function (errorMessage) {
            logout();
            document.location.href = 'login.html';
        }
    });
    return user
}

function addUserToGroup(group){
    $.ajax({
        url:window.CONNECTION_NODE+'/groupUser/addUserToGroup',
        type: "post",
        data: {group: group, token:token} ,
        dataType:'json',
        success: function (res) {
            getMembersGroup(group);
            verifyIsJoinGroup(group);
        },
        error: function (errorMessage) {
            console.log(errorMessage);
        }
    });
}

function removeUserFromGroup(group){
    $.ajax({
        url:window.CONNECTION_NODE+'/groupUser/removeUserFromGroup',
        type: "post",
        data: {group: group, token:token} ,
        dataType:'json',
        success: function (res) {
            getMembersGroup(group);
            verifyIsJoinGroup(group);
        },
        error: function (errorMessage) {
            console.log(errorMessage);
        }
    });
}


function verifyIsOwnerGroup(id){
    $.ajax({
        url:window.CONNECTION_NODE+'/group/verifyIsOwner',
        type: "get",
        data: {id_group: id, token:token} ,
        dataType:'json',
        success: function (res) {
            if(res[0].isOwner=='1'){
                $('#container-btn_join').css('visibility', 'hidden');
            }
        },
        error: function (errorMessage) {
            alert(errorMessage);
        }
    });
}
function verifyIsJoinGroup(id){
    $.ajax({
        url:window.CONNECTION_NODE+'/groupUser/verifyIsJoinGroup',
        type: "get",
        data: {id_group: id, token:token} ,
        dataType:'json',
        success: function (res) {
            if(res[0].isJoin=='1'){
                $('#btn-join').html('Leave Group');
            }else{
                $('#btn-join').html('Join Group');
            }
        },
        error: function (errorMessage) {
            alert(errorMessage);
        }
    });
}

async function getMyId(){
    var user
    await $.ajax({
        url:window.CONNECTION_NODE+'/user/getMyId',
        type: "get",
        data: {token:token} ,
        dataType:'json',
        success: function (res) {
            user=res;
        },
        error: function (errorMessage) {
            logout();
            document.location.href = 'login.html';
        }
    });
    return user
}