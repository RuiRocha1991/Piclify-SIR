function loadPhotos(photos){
    showPhoto(photos.slice(countLoad,countuploadedPhotos));
    countLoad=countuploadedPhotos;
    countuploadedPhotos=countuploadedPhotos+rangeLoad;
}
function showPhoto(data){
    for(var i =0; i<data.length; i++){
        var islike = data[i].isLike ==1 ? 'fas': 'far';
        var time = calculateTimeOfUpload(data[i].date_upload);
        $('#container').append(`<div id="card${data[i].id_photo}" class="card mx-3 p-0 mb-4 col-xl-3 col-lg-3 col-md-5 col-sm-11 border rounded"> <!--Start Card-->
            <div class="card-header bg-white">
                <div class="media m-0" >
                <a href="profileUser.html?id=${data[i].user}"><div class="d-flex mr-3 userPhoto" style="background-image: url('./../upload/profile/${data[i].profile_photo}'); overflow:hidden; max-width: 100%; max-height:100%; background-repeat: no-repeat; background-position:center; background-size:cover; height:50px; width: 50px; border-radius: 50%; cursor:pointer">
                    
                    </div></a>
                    <div class="media-body">
                        <small style="font-size: 20px;font-weight: bold;cursor:pointer" class="userPhoto"> <a class="formatLink" href="profileUser.html?id=${data[i].user}">${data[i].nameUser}</a></small>
                        <small class="mt-1 float-right"><i class="icon ion-md-time"></i><span>${time} ago</span></small>
                    </div>
                </div><!--/ media -->    
            <div class="border-bottom pb-1 mb-0">
                    <h5 class="text-center mb-0">${data[i].name}</h5>
            </div>
            </div>
            <div id="photo${data[i].id_photo}" class="card-body p-0" style="background-image: url('../upload/userPhotos/${data[i].user}/${data[i].path}'); overflow:hidden; max-width: 100%; max-height:100%; background-repeat: no-repeat; background-position:center; background-size:cover; height:300px">
            </div>
            <div class="card-footer bg-white mx-3 p-0">
                <div>
                    <p class="font-weight-normal m-0 border-bottom mt-1 pb-1">${data[i].description}</p>
                </div>
                <ul class="list-inline m-0">
                    <li class="list-inline-item mt-2"><a><i id="iconLike${data[i].id_photo}" data-id="${data[i].id_photo}" class="${islike} fa-thumbs-up"></i><span id="countLikes${data[i].id_photo}"> ${data[i].likes}</span></a></li>
                    <li class="list-inline-item mt-2"><a><i class="fa fa-comments"></i><span id="countComment${data[i].id_photo}"> ${data[i].countComments}</span></a></li>
                </ul>
            </div>
            <div class="input-group mt-2">
                <input id="inputComment${data[i].id_photo}" type="text" class="form-control" placeholder="Write a comment" aria-label="Recipient's username" aria-describedby="button-addon2">
                <div class="input-group-append">
                    <button id="btn-AddComment${data[i].id_photo}" class="btn-AddComment btn btn-outline-success" type="button"  data-id="${data[i].id_photo}" ><i class="fa fa-share-square"></i></button>
                </div>
            </div>
        </div>`);
        initFunctionsIndex(data[i].id_photo);
    }
}