function fillProfileDetails(data){
    var photo =data.profile_photo =='' ? 'no-photo.png': data.profile_photo;
    $('#container-profile-photo').css('background-image',"url('../upload/profile/"+photo+"')");
    $('#lb-name').text(data.name);
    $('#lb-email').text(data.email);
    $('#input-id_user').val(data.id_user);
    $('#form-id_user').val(data.id_user);
    $('#lb-followers').text(data.countFollowers+' followers');
}

function fillListAlbums(data){
    $('#listAlbuns li').remove();
    for(var i=0; i<data.length; i++){
        $('#listAlbuns').append(`<li class="list-group-item listAlbums" data-id="${data[i].id_albums}">${data[i].description}</li>`);
    }
    $('#listAlbuns').append('<li class="list-group-item p-0"><div class="input-group border-bottom"><input id="newAlbum" type="text" class="name-photo form-control border-0 bg-white" placeholder="New Album"><div class="input-group-append"><button class="btn btn-outline-secondary border-0" type="button" onclick="createNewAlbum()"><i class="fa fa-plus"></i></button></div></div></li>');
    $('.listAlbums').click(function(){
        $('#photosContainer').html("")
        getPhotosByAlbum($(this).data('id'))
    });
}

function fillListGroups(data,id){
    for(var x=0; x<data.length;x++){
        $('#listGroups').append(`<li class="list-group-item listGroups" data-id="${data[x].id_group}" data-user="${data[x].owner}">${data[x].title}</li>`);
    }
    $('.listGroups').click(function(){
        document.location.href = 'groups.html?id='+$(this).data('id')+'&user='+$(this).data('user')+'&userToken='+id;
    });
    $('#listGroups').append('<li class="list-group-item p-0"><div class="input-group border-bottom"><input id="newGroup" type="text" class="name-photo form-control border-0 bg-white" placeholder="New Group"><div class="input-group-append"><button class="btn btn-outline-secondary border-0" type="button" data-toggle="modal" data-target="#modal-create-groups" onclick="fillModalNewGroup()"><i class="fa fa-plus"></i></button></div></div></li>');
}

function fillModalNewGroup(){
    $('#formIdTitleGroup').val('');
    $('#formIdTitleGroup').val($('#newGroup').val());
    $('#newGroup').val('');
}

function fillModalWithPhotoAlbums(albumsByUser, albumsByPhoto, photo){
    let albumHasPhoto =false
    $('#modal-body-albums .btn-group').remove();
    $('#modal-body-albums h6').remove();
    $('#modal-body-albums').append('<h6>select the albums for the photo</h6>')
    for(var i=0; i<albumsByUser.length; i++){
        albumHasPhoto =false
        for(var j=0; j<albumsByPhoto.length; j++){
            if(albumsByPhoto[j].album==albumsByUser[i].id_albums){
                albumHasPhoto = true
            }
        }
        if(albumHasPhoto){       
            $('#modal-body-albums').append(`<div class="btn-group btn-group-toggle p-1 div-btn-modal-albums m-3" data-toggle="buttons"><label class="btn btn-outline-light active select" data-id="${albumsByUser[i].id_albums}"><input type="checkbox" name="options" autocomplete="off" checked> ${albumsByUser[i].description}</label></div>`)
        }else{
            $('#modal-body-albums').append(`<div class="btn-group btn-group-toggle p-1 div-btn-modal-albums m-3" data-toggle="buttons"><label class="btn btn-outline-light select" data-id="${albumsByUser[i].id_albums}"><input type="checkbox" name="options" autocomplete="off"> ${albumsByUser[i].description}</label></div>`)
        }
    }
    $('.select').click(function(){
        if($(this).hasClass('active')){
            onClickChangeStateOfAlbumPhoto('removeAlbumOfPhoto',photo, $(this).data('id'));
        }else{
            onClickChangeStateOfAlbumPhoto('addPhotoInAlbum',photo, $(this).data('id'));
        }
    })
}

function fillModalWithPhotoGroups(groupsByUser, groupsByPhoto, photo){
    let groupHasPhoto =false
    $('#modal-body-groups .btn-group').remove();
    $('#modal-body-groups h6').remove();
    $('#modal-body-groups').append('<h6>select the groups for the photo</h6>')
    for(var i=0; i<groupsByUser.length; i++){
        groupHasPhoto =false
        for(var j=0; j<groupsByPhoto.length; j++){
            if(groupsByPhoto[j].id_group==groupsByUser[i].id_group){
                groupHasPhoto = true
            }
        }
        if(groupHasPhoto){       
            $('#modal-body-groups').append(`<div class="btn-group btn-group-toggle p-1 div-btn-modal-albums m-3" data-toggle="buttons"><label class="btn btn-outline-light active select" data-id="${groupsByUser[i].id_group}"><input type="checkbox" name="options" autocomplete="off" checked> ${groupsByUser[i].title}</label></div>`)
        }else{
            $('#modal-body-groups').append(`<div class="btn-group btn-group-toggle p-1 div-btn-modal-albums m-3" data-toggle="buttons"><label class="btn btn-outline-light select" data-id="${groupsByUser[i].id_group}"><input type="checkbox" name="options" autocomplete="off"> ${groupsByUser[i].title}</label></div>`)
        }
    }
    $('.select').click(function(){
        console.log('select existe')
        if($(this).hasClass('active')){
            onClickChangeStateOfGroupPhoto('removeGroupOfPhoto',photo, $(this).data('id'));
        }else{
            onClickChangeStateOfGroupPhoto('addPhotoInGroup',photo, $(this).data('id'));
        }
    })
}

function fillUserPhotos(data){
    for(var i=0; i<data.length; i++){
        $('#photosContainer').append(`<div id="card${data[i].id_photo}" class="card mx-3 mb-4 col-xl-5 col-lg-5 col-md-5 col-sm-11" data-id="${data[i].id_photo}"> <!--Start Card-->
            <div class="card-header bg-white">
                <div class="input-group mt-1 border-bottom">
                    <input id="photoName-${data[i].id_photo}"  type="text" class="name-photo form-control border-0 bg-white text-center" value="${data[i].name}" disabled="disabled">
                    <div class="input-group-append">
                        <button id="btn-edit-name${data[i].id_photo}" class="btn btn-outline-secondary border-0 " type="button"><i class="fa fa-edit"></i></button>
                    </div>
                </div>
            </div>
            <div id="photoCard${data[i].id_photo}" class="card-body p-0" style="background-image: url('./../upload/userPhotos/${data[i].user}/${data[i].path}'); overflow:hidden;max-With: 100%; max-height:100%; background-repeat: no-repeat; background-position:center; background-size:cover; height:300px">
                    
            </div>
            <div class="card-footer bg-white m-0 p-0">
                    <div class="input-group mt-1 border-bottom">
                            <input id="photoDescription-${data[i].id_photo}" type="text" class="description form-control border-0 bg-white text-center" value="${data[i].description}" disabled="disabled">
                            <div class="input-group-append">
                                <button id="btn-edit-description${data[i].id_photo}" class=" btn btn-outline-secondary border-0" type="button"><i class="fa fa-edit"></i></button>
                            </div>
                        </div>
                
                <ul class="list-inline m-0">
                    <li class="list-inline-item mt-2 py-2 pr-2 border-right"><a><i class="fa fa-thumbs-up"></i><span> ${data[i].countLikes} </span></a></li>
                    <li class="list-inline-item mt-2"><a><i class="fa fa-comments"></i><span> ${data[i].countComments}</span></a></li>
                </ul>
                <ul class="list-inline mb-3">
                    <li id="albums${data[i].id_photo}" class=" list-inline-item mt-2 py-2 pr-2 border-right"><a><i class="fa fa-book"> </i><span id="countAlbums${data[i].id_photo}"> ${data[i].countAlbums}</span><span> Albums</span></a></li>
                    <li id="groups${data[i].id_photo}" class=" list-inline-item mt-2 py-2 pr-2 border-right"><a><i class="fa fa-users"> </i><span id="countGroups${data[i].id_photo}"> ${data[i].countGroups}</span><span> Groups</span></a></li>
                    <li class="list-inline-item mt-2"><a><i class="fa fa-lock mr-4"></i> <label><input id="photoIsPrivate-${data[i].id_photo}" class="form-check-input pt-2 checkbox-photo" type="checkbox" ${data[i].is_private ==1? 'checked': ''}>Is private</label></a></li>
                </ul>
                <span></span>
            </div>
        </div>`);
        initFunctionsCard(data[i]);
    }
}