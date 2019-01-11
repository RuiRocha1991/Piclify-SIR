var token =document.cookie.replace('token=', '');

$(document).ready(function(){
    window.$_GET = new URLSearchParams(location.search);
    getMembersGroup($_GET.get('id'), $_GET.get('user'));
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
});

function getMembersGroup(group,user){
    $.ajax({
        url:window.CONNECTION_NODE+'/groupUser/getListUsersByGroup',
        type: "get",
        data: {token:token, group:group} ,
        dataType:'json',
        success: function (res) {
            $('#lb-members').text('Members:  ' +res.length);
            getDetailsMembers(res,user);
        },
        error: function (errorMessage) {
            logout();
            document.location.href = 'login.html';
        }
    });
}

async function getDetailsMembers(data,user){
    $('#listMembers li').remove();
    for(var i=0; i<data.length;i++){
        if(data[i].idUser!=user){
            await $.ajax({
                url:window.CONNECTION_NODE+'/user/getDetailsUserById',
                type: "get",
                data: {token:token, id_user:data[i].idUser} ,
                dataType:'json',
                success: function (res) {

                    $('#listMembers').append(`<div class="row ml-3 mb-3 userProfile" style="align-items:center;" data-id="${res[0].id_user}" >
                        <div class=" p-0" style="background-image: url('./../upload/profile/${res[0].profile_photo}'); overflow:hidden; max-height:100%; background-repeat:no-repeat; background-position:center; background-size:cover; height:40px;width:40px; border-radius: 100%"></div>
                        <small class="ml-3 mt-2" style="font-size: 20px;font-weight: bold;">${res[0].name}</small>
                    </div>`)
                },
                error: function (errorMessage) {
                    logout();
                    document.location.href = 'login.html';
                }
            });
        }
        
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