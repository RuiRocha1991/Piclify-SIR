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

function fillModalWithPhotoAlbums(data){
    $('#modal-body-albums .btn-group').remove();
    $('#modal-body-albums h6').remove();
    $('#modal-body-albums').append('<h6>select the albums for the photo</h6>')
    for(var i=0; i<data.length; i++){
        $('#modal-body-albums').append(`<div class="btn-group btn-group-toggle p-1 div-btn-modal-albums m-3" data-toggle="buttons"><label class="btn btn-outline-light  "><input data-id="${data[i].id_albums}"  type="checkbox" name="options" autocomplete="off" checked> ${data[i].description}</label></div>`)
    }
}

function fillModalWithPhotoGroups(data){
    $('#modal-body-groups .btn-group').remove();
    $('#modal-body-groups h6').remove();
    $('#modal-body-groups').append('<h6>select the albums for the photo</h6>')
    for(var i=0; i<data.length; i++){
       $('#modal-body-groups').append(`<div title="${data[i].description}" class="btn-group btn-group-toggle p-1 div-btn-modal-albums m-3" data-toggle="buttons"><label class="btn btn-outline-light  "><input data-id="${data[i].id_group}"  type="checkbox" name="options" autocomplete="off" checked> ${data[i].title}</label></div>`)
    }
}

function fillUserPhotos(data){


    $('#photosContainer').append(`<div class="card shadow-sm m-3 col-xl-5 col-lg-5 col-md-5 col-sm-11" data-id="${data.data.id_photo}"> <!--Start Card-->
                        <div class="card-header bg-white">
                            <div class="input-group mt-1 border-bottom">
                                <input id="photoName-${data.data.id_photo}"  type="text" class="name-photo form-control border-0 bg-white text-center" value="${data.data.name}" disabled="disabled">
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary border-0 btn-edit-name" type="button"><i class="fa fa-edit"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="card-body p-0">
                            <img class="img-fluid m-0" src="./../upload/userPhotos/${data.data.user}/${data.data.path}" alt="Image">
                        </div>
                        <div class="card-footer bg-white m-0 p-0">
                                <div class="input-group mt-1 border-bottom">
                                        <input id="photoDescription-${data.data.id_photo}" type="text" class="description form-control border-0 bg-white text-center" value="${data.data.description}" disabled="disabled">
                                        <div class="input-group-append">
                                            <button class="btn-edit-description btn btn-outline-secondary border-0" type="button"><i class="fa fa-edit"></i></button>
                                        </div>
                                    </div>
                            
                            <ul class="list-inline m-0">
                                <li class="list-inline-item mt-2 py-2 pr-2 border-right"><a><i class="fa fa-thumbs-up"></i><span> ${data.countLikes} </span></a></li>
                                <li class="list-inline-item mt-2"><a><i class="fa fa-comments"></i><span> ${data.countComments}</span></a></li>
                            </ul>
                            <ul class="list-inline mb-3">
                                <li class="albums list-inline-item mt-2 py-2 pr-2 border-right"><a><i class="fa fa-book"></i><span> ${data.countAlbums} Albums</span></a></li>
                                <li class="groups list-inline-item mt-2 py-2 pr-2 border-right"><a><i class="fa fa-users"></i><span> ${data.countGroups} Groups</span></a></li>
                                <li class="list-inline-item mt-2"><a><i class="fa fa-lock mr-4"></i> <label><input id="photoIsPrivate-${data.data.id_photo}" class="form-check-input pt-2 checkbox-photo" type="checkbox" ${data.data.is_private ==1? 'checked': ''}>Is private</label></a></li>
                            </ul>
                            <span></span>
                        </div>
                    </div>`);
}