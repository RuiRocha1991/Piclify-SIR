var token =document.cookie.replace('token=', '');
var modal;
var owner;
var user;
$(document).ready(function(){
    window.$_GET = new URLSearchParams(location.search);
    getMembersGroup($_GET.get('id'));
    verifyIsOwnerGroup($_GET.get('id'));
    owner=$_GET.get('user');
    user =$_GET.get('userToken');
    $.ajax({
        url:window.CONNECTION_NODE+'/group/getListGroupById',
        type: "get",
        data: {token:token, id_group:$_GET.get('id') } ,
        dataType:'json',
        success: function (res) {
            getPhotosByGroup($_GET.get('id'))
            fillInfoAboutGroup(res);
        },
        error: function (errorMessage) {
            logout();
            document.location.href = 'login.html';
        }
    });
    modal= document.getElementById('modalPhoto');
    window.onclick = function(event){
        if(event.target ==modal){
            modal.style.display = "none"
        }
    }
    
    $('#btn-join').click(function(){
        if($('#btn-join').text() == 'Join Group'){
            addUserToGroup($_GET.get('id'));
        } else{
            removeUserFromGroup($_GET.get('id'));
        }
        
    })
});

function getMembersGroup(group){
    $.ajax({
        url:window.CONNECTION_NODE+'/groupUser/getListUsersByGroup',
        type: "get",
        data: {token:token, group:group} ,
        dataType:'json',
        success: function (res) {
            $('#lb-members').text('Members:  ' +res.length);
            getDetailsMembers(res,owner,user);
        },
        error: function (errorMessage) {
            logout();
            document.location.href = 'login.html';
        }
    });
}

async function getDetailsMembers(data){
    var userIsJoined = false
    $('#listMembers li').remove();
    for(var i=0; i<data.length;i++){
        if(data[i].idUser!=user){ //se for diferente do utilizador
            await $.ajax({
                url:window.CONNECTION_NODE+'/user/getDetailsUserById',
                type: "get",
                data: {token:token, id_user:data[i].idUser} ,
                dataType:'json',
                success: function (res) {
                    $('#listMembers').append(`<li class="list-group-item member" data-id="${res[0].id_user}" >${res[0].name}</li>`)
                },
                error: function (errorMessage) {
                    logout();
                    document.location.href = 'login.html';
                }
            });
        }else{
            userIsJoined = true;
        }
    }

    if(userIsJoined ==true){
        $('#btn-join').html('Leave Group')
    }else{
        $('#btn-join').html('Join Group')
    }
    $(".userProfile").css( 'cursor', 'pointer' );
    $('.userProfile').click(function(){
        document.location.href = 'profileUser.html?id='+$(this).data('id');
    });
}

function fillInfoAboutGroup(data){
    $('#titleGroup').text(data[0].title);
    $('#descriptionGroup').text(data[0].description); 
}

function initFunctionsCard(){
    $('.card').hover(function(){
        $(this).addClass('shadow');
    },function(){
        $(this).removeClass('shadow');
    });  
}