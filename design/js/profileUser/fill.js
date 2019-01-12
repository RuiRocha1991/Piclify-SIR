function fillListGroups(list){
    for(var x=0; x<list.length;x++){
        $('#listGroups').append(`<li class="list-group-item listGroups" data-id="${list[x].id_group}">${list[x].title}</li>`);
    }
    $('.listGroups').click(function(){
        document.location.href = 'groups.html?id='+$(this).data('id');
    });
}

function fillProfileDetails(data){
    var photo =data.profile_photo =='' ? 'no-photo.png': data.profile_photo;
    $('#container-profile-photo').css('background-image',"url('../upload/profile/"+photo+"')");
    $('#lb-name').text(data.name);
    $('#lb-email').text(data.email);
    $('#input-id_user').val(data.id_user);
    $('#form-id_user').val(data.id_user);
    $('#lb-followers').text(data.countFollowers);
}

function fillListAlbums(data){
    $('#listAlbuns li').remove();
    for(var i=0; i<data.length; i++){
        if(data[i].totalPhotos>0)
            $('#listAlbuns').append(`<li data-id="${data[i].id_albums}" class="listAlbuns list-group-item">${data[i].description}</li>`);
    }
    $('.listAlbuns').click(function(){
        $('#container .card').remove();
        getPhotosToVisitorByAlbum($(this).data('id'));
    })
}

function loadPhotos(photos, user){
    fillCardPhotos(photos.slice(countLoad,countuploadedPhotos),user);
    countLoad=countuploadedPhotos;
    countuploadedPhotos=countuploadedPhotos+rangeLoad;
}

async function fillCardPhotos(photos, user){
    for(var i=0; i<photos.length; i++){
        var likes = await getCountLikesByPhoto(photos[i].id_photo);
        var comments= await getCountCommentsByPhoto(photos[i].id_photo);
        var islike = await getIsLikePhoto(photos[i].id_photo) ? 'fas': 'far';
        var time = calculateTimeOfUpload(photos[i].date_upload);
        $('#container').append(`<div id="card${photos[i].id_photo}" class="card mx-3 p-0 mb-4 col-xl-5 col-lg-5 col-md-5 col-sm-11 border rounded"> <!--Start Card-->
            <div class="card-header bg-white">
            <div class="media m-0" id="userPhoto${photos[i].id_photo}">
                <div class="d-flex mr-3 userPhoto" style="background-image: url('./../upload/profile/${user.profile_photo}'); overflow:hidden; max-width: 100%; max-height:100%; background-repeat: no-repeat; background-position:center; background-size:cover; height:50px; width: 50px; border-radius: 50%; cursor:pointer">
                </div>
                <div class="media-body">
                    <small style="font-size: 20px; cursor:pointer;" class="userPhoto font-weight-bold"> ${user.name}</small>
                    <small class="mt-1 float-right"><i class="icon ion-md-time"></i><span>${time} ago</span></small>
                </div>
            </div><!--/ media -->
            <div class="border-bottom pb-1 mb-0">
                    <h5 class="text-center mb-0">${photos[i].name}</h5>
            </div>
            </div>
            <div id="photoCard${data[i].id_photo}" class="card-body p-0" style="background-image: url('../upload/userPhotos/${user.id_user}/${photos[i].path}'); overflow:hidden; max-width: 100%; max-height:100%; background-repeat: no-repeat; background-position:center; background-size:cover; height:300px">
            </div>
            <div class="card-footer bg-white mx-3 p-0">
                <div>
                    <label class="h6 mt-1"><br>
                        <p class="font-weight-normal m-0 border-bottom mt-1 pb-1">${photos[i].description}</p>
                    </label>
                </div>
                <ul class="list-inline m-0">
                    <li class="list-inline-item mt-2"><a><i id="iconLikes${photos[i].id_photo}" data-id="${photos[i].id_photo}" class="${islike} fa-thumbs-up"></i><span id="countLikes${photos[i].id_photo}"> ${likes}</span></a></li>
                    <li class="list-inline-item mt-2"><a><i class="fa fa-comments"></i><span id="countComment${photos[i].id_photo}"> ${comments}</span></a></li>
                </ul>
            </div>
            <div class="input-group mt-2">
                <input id="inputComment${photos[i].id_photo}" type="text" class="form-control" placeholder="Write a comment" aria-label="Recipient's username" aria-describedby="button-addon2">
                <div class="input-group-append">
                    <button id="btn-AddComment${photos[i].id_photo}" class="btn-AddComment btn btn-outline-success" type="button"  data-id="${photos[i].id_photo}" ><i class="fa fa-share-square"></i></button>
                </div>
            </div>
        </div>`);

        $('#photoCard'+photos[i].id_photo).click(function(){
            modal.style.display = "block";
            openPhotoModal(photos[i]);
        });
        initFunctionsProfileUser(photos[i].id_photo);
    }

    


}