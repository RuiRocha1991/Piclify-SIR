var token =document.cookie.replace('token=', '');

$(document).ready(function(){
    var data = {token:token};
    $.ajax({
        url:'http://localhost:3000/user',
        type: "get",
        data: data ,
        dataType:'json',
        success: function (res) {
            fillProfileDetails(res[0]);
            getNumberFollowers(res[0].id_user);
            getListAlbums(res[0].id_user);
        },
        error: function (errorMessage) {
            logout();
            document.location.href = 'login.html';
        }
    });

    $('.card').hover(function(){
        $(this).addClass('shadow');
    },function(){
        $(this).removeClass('shadow');
    }); 

    $('.btn-edit-name').click(function(){
        let parent= $(this).parent().parent();
        let input= parent[0].children[0];

        if(parent[0].children[0].disabled == true){
            $(input).prop('disabled', false);
            $(input).select();
            $(this).find('i').removeClass('fa-edit');
            $(this).find('i').addClass('fa-save');
            console.log($(input).data('id'));
        }else{
            $(input).prop('disabled', true);
            $(this).find('i').addClass('fa-edit');
            $(this).find('i').removeClass('fa-save');
            console.log($(input).val());
            //create function to save new name
        }
    });

    $('.btn-edit-description').click(function(){
        let parent= $(this).parent().parent();
        let input= parent[0].children[0];
        if(input.disabled == true){
            $(input).prop('disabled', false);
            $(input).select();
            $(this).find('i').removeClass('fa-edit');
            $(this).find('i').addClass('fa-save');
            console.log($(input).data('id'));
        }else{
            $(input).prop('disabled', true);
            $(this).find('i').addClass('fa-edit');
            $(this).find('i').removeClass('fa-save');
            console.log($(input).val());
            //create a function to save descrition
        }
    })

    $('.albums').click(function(){
        $('#modal-edit-albums').modal('show');
        $('#modal-body-albums').append(`<h1>${$(this).data('id')}</h1>`);
    })

    $('.groups').click(function(){
        $('#modal-edit-groups').modal('show');
        console.log($(this).data('id'));
    })

});

function showModalEditAlbums(data){
    console.log(data);
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
        url:'http://localhost:3000/user/getFollowers',
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
        url:'http://localhost:3000/album/getListAlbums',
        type: "get",
        data: {id_user: id, token:token} ,
        dataType:'json',
        success: function (res) {
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
        $('#listAlbuns').append(`<li class="list-group-item">${data[i].description}</li>`)
    }
    $('#listAlbuns').append('<li class="list-group-item p-0"><div class="input-group border-bottom"><input id="newAlbum" type="text" class="name-photo form-control border-0 bg-white" placeholder="New Album"><div class="input-group-append"><button class="btn btn-outline-secondary border-0" type="button" onclick="createNewAlbum()"><i class="fa fa-plus"></i></button></div></div></li>');
    
}

function saveAlbunsOfPhoto(){
    console.log('chegou');
}

function saveGroupsOfPhoto(){
    console.log('chegou');
}

function createNewAlbum(){
    var description = $('#newAlbum').val();
    if(description !== ''){
        $.ajax({
            url:'http://localhost:3000/album/createAlbum',
            type: "post",
            data: {description: description, token:token} ,
            dataType:'json',
            success: function (res) {
                fillListAlbums(res);
            },
            error: function (errorMessage) {
                alert(errorMessage);
            }
        });
    }
}

function createNewGroup(){
    var title = $('#newGroup').val();
    var description ='teste'; 
    if(title !== ''){
        $.ajax({
            url:'http://localhost:3000/group/createGroup',
            type: "post",
            data: {title: title,description: description, token:token} ,
            dataType:'json',
            success: function (res) {
                console.log(res);
            },
            error: function (errorMessage) {
                alert(errorMessage);
            }
        });
    }
}

function addGroupToFollower(res){
    $.ajax({
        url:'http://localhost:3000/groupUser/addUserToGrupo',
        type: "post",
        data: {group: res[0].id_group, token:token} ,
        dataType:'json',
        success: function (res) {
            console.log(res);
        },
        error: function (errorMessage) {
            alert(errorMessage);
        }
    });
}