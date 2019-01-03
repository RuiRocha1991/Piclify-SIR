function fillProfileDetails(data){
    var photo =data.profile_photo =='' ? 'no-photo.png': data.profile_photo;
    $('#profile-photo').attr('src','../upload/profile/'+photo);
    $('#lb-name').text(data.name);
    $('#lb-email').text(data.email);
    $('#input-id_user').val(data.id_user);
    $('#form-id_user').val(data.id_user);
   
}

function fillListAlbums(data){
    $('#listAlbuns li').remove();

    for(var i=0; i<data.length; i++){
        $('#listAlbuns').append(`<li class="list-group-item">${data[i].description}</li>`);
    }
    $('#listAlbuns').append('<li class="list-group-item p-0"><div class="input-group border-bottom"><input id="newAlbum" type="text" class="name-photo form-control border-0 bg-white" placeholder="New Album"><div class="input-group-append"><button class="btn btn-outline-secondary border-0" type="button" onclick="createNewAlbum()"><i class="fa fa-plus"></i></button></div></div></li>');
}

function fillListGroups(data){
    for(var x=0; x<data.length;x++){
        $('#listGroups').append(`<li class="list-group-item listGroups" data-id="${data[x].id_group}">${data[x].title}</li>`);
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