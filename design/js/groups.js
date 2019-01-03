var token =document.cookie.replace('token=', '');

$(document).ready(function(){
    window.$_GET = new URLSearchParams(location.search);
    getMembersGroup($_GET.get('id'));
    $.ajax({
        url:'http://localhost:3000/group/getListGroupById',
        type: "get",
        data: {token:token, id_group:$_GET.get('id') } ,
        dataType:'json',
        success: function (res) {
            fillInfoAboutGroup(res);
        },
        error: function (errorMessage) {
            logout();
            document.location.href = 'login.html';
        }
    });
});

function getMembersGroup(id){
    $.ajax({
        url:'http://localhost:3000/groupUser/getListUsersByGroup',
        type: "get",
        data: {token:token, group:id} ,
        dataType:'json',
        success: function (res) {
            $('#lb-members').text('Membres: ' +res.length);
            getDetailsMembers(res);
        },
        error: function (errorMessage) {
            logout();
            document.location.href = 'login.html';
        }
    });
}

async function getDetailsMembers(data){
    $('#listMembers li').remove();
    for(var i=0; i<data.length;i++){
        await $.ajax({
            url:'http://localhost:3000/user/getDetailsUserById',
            type: "get",
            data: {token:token, id_user:data[i].idUser} ,
            dataType:'json',
            success: function (res) {
                $('#listMembers').append(`<li class="list-group-item member" data-id="${res[0].id_user}" >${res[0].name}</li>`);
            },
            error: function (errorMessage) {
                logout();
                document.location.href = 'login.html';
            }
        });
    }

    $('.member').click(function(){
        //console.log($(this).data('id'));
        document.location.href = 'profileUser.html?id='+$(this).data('id');
    });
}

function fillInfoAboutGroup(data){
    $('#titleGroup').text(data[0].title);
    $('#descriptionGroup').text(data[0].description);
    
}