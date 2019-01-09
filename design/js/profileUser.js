var token =document.cookie.replace('token=', '');

$(document).ready(function(){
    window.$_GET = new URLSearchParams(location.search);
    getDetailsUser($_GET.get('id'));
    getNumberFollowers($_GET.get('id'));
    getListAlbums($_GET.get('id'));
    getListGroups($_GET.get('id'));
    verifyIsFollowed($_GET.get('id'));
});

function getDetailsUser(id){
    $.ajax({
        url:window.CONNECTION_NODE+'/user/getDetailsUserById',
        type: "get",
        data: {token:token, id_user: id} ,
        dataType:'json',
        success: function (res) {
            fillProfileDetails(res[0]);
        },
        error: function (errorMessage) {
            logout();
            document.location.href = 'login.html';
        }
    });
}

function fillProfileDetails(data){
    var photo =data.profile_photo =='' ? 'no-photo.png': data.profile_photo;
    $('#profile-photo').attr('src','../upload/profile/'+photo);
    $('#lb-name').text(data.name);
    $('#lb-email').text(data.email);
    $('#input-id_user').val(data.id_user);
    $('#form-id_user').val(data.id_user);
}

function getNumberFollowers(id){
    $.ajax({
        url:window.CONNECTION_NODE+'/user/getFollowers',
        type: "get",
        data: {id_user: id, token:token} ,
        dataType:'json',
        success: function (res) {
            $('#lb-followers').text(res[0].followers+' followers');
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

function fillListAlbums(data){
    $('#listAlbuns li').remove();

    for(var i=0; i<data.length; i++){
        $('#listAlbuns').append(`<li class="list-group-item">${data[i].description}</li>`);
    }
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
    for(var x=0; x<list.length;x++){
        $('#listGroups').append(`<li class="list-group-item listGroups" data-id="${list[x].id_group}">${list[x].title}</li>`);
    }
    $('.listGroups').click(function(){
        document.location.href = 'groups.html?id='+$(this).data('id');
    });
}

function verifyIsFollowed(id){
    $.ajax({
        url:window.CONNECTION_NODE+'/follower/verifyFollower',
        type: "get",
        data: {id_user: id,token:token} ,
        dataType:'json',
        success: function (res) {
            console.log(res);
        },
        error: function (errorMessage) {
            alert(errorMessage);
        }
    });
}