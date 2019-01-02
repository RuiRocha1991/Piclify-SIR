var token =document.cookie.replace('token=', '');
var ListAlbums;
var ListGroups= new Array();

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
            getListGroups(res[0].id_user);
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
        $('#modal-body-albums').attr("data-id",$(this).data('id'));
        fillModalToSelectAlbums(ListAlbums);
    })

    $('.groups').click(function(){
        $('#modal-edit-groups').modal('show');
        $('#modal-body-groups').attr("data-id",$(this).data('id'));
        fillModalToSelectGroups(ListGroups);
    });

    

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
                $('#newAlbum').val('');
                ListAlbums=res;
                fillListAlbums(res);
            },
            error: function (errorMessage) {
                alert(errorMessage);
            }
        });
    }
}

function createNewGroup(){
    var title = $('#formIdTitleGroup').val();
    var description =$('#formIdDescriptionGroup').val(); 
    if(title !== '' && description!==''){
        $.ajax({
            url:'http://localhost:3000/group/createGroup',
            type: "post",
            data: {title: title,description: description, token:token} ,
            dataType:'json',
            success: function (res) {
                addGroupToFollower(res);
                $('#formIdTitleGroup').val('');
                $('#formIdDescriptionGroup').val('');
            },
            error: function (errorMessage) {
                alert(errorMessage);
            }
        });
    }

}

function addGroupToFollower(res){
    $.ajax({
        url:'http://localhost:3000/groupUser/addUserToGroup',
        type: "post",
        data: {group: res[0].id_group, token:token} ,
        dataType:'json',
        success: function (res) {
            getGroupsDetailsByUser(res);
        },
        error: function (errorMessage) {
            alert(errorMessage);
        }
    });
}

function getListGroups(id){
    $.ajax({
        url:'http://localhost:3000/groupUser/getListGroupsByUser',
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
            url:'http://localhost:3000/group/getListGroupById',
            type: "get",
            data: {id_group: res[i].idGroup, token:token} ,
            dataType:'json',
            success: function (res) {
                ListGroups.push(res[0]);
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
    $('#listGroups').append('<li class="list-group-item p-0"><div class="input-group border-bottom"><input id="newGroup" type="text" class="name-photo form-control border-0 bg-white" placeholder="New Group"><div class="input-group-append"><button class="btn btn-outline-secondary border-0" type="button" data-toggle="modal" data-target="#modal-create-groups" onclick="fillModalNewGroup()"><i class="fa fa-plus"></i></button></div></div></li>');
}

function fillModalNewGroup(){
    $('#formIdTitleGroup').val('');
    $('#formIdTitleGroup').val($('#newGroup').val());
    $('#newGroup').val('');
}

function fillModalToSelectAlbums(data){
    $('#modal-body-albums .btn-group').remove();
    $('#modal-body-albums h6').remove();
    $('#modal-body-albums').append('<h6>select the albums for the photo</h6>')
    for(var i=0; i<data.length; i++){
        $('#modal-body-albums').append(`<div class="btn-group btn-group-toggle p-1 div-btn-modal-albums m-3" data-toggle="buttons"><label class="btn btn-outline-light  "><input data-id="${data[i].id_albums}"  type="checkbox" name="options" autocomplete="off" checked> ${data[i].description}</label></div>`)
    }
}

function fillModalToSelectGroups(data){
    $('#modal-body-groups .btn-group').remove();
    $('#modal-body-groups h6').remove();
    $('#modal-body-groups').append('<h6>select the albums for the photo</h6>')
    for(var i=0; i<data.length; i++){
       $('#modal-body-groups').append(`<div title="${data[i].description}" class="btn-group btn-group-toggle p-1 div-btn-modal-albums m-3" data-toggle="buttons"><label class="btn btn-outline-light  "><input data-id="${data[i].id_group}"  type="checkbox" name="options" autocomplete="off" checked> ${data[i].title}</label></div>`)
    }
}
