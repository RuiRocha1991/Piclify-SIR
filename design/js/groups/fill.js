async function addCardToGroup(data){
    var user = await getDetailsUser(data.data.user);
    var time = calculateTimeOfUpload(data.data.date_upload);
    var islike = await getIsLikePhoto(data.data.id_photo) ? 'fas': 'far';
    $('#container').append(`<div class="card mx-3 p-0 mb-4 col-xl-5 col-lg-5 col-md-5 col-sm-11 border rounded" data-id="${user.id_user}"> <!--Start Card-->
                        <div class="card-header bg-white">
                            <div class="media m-0" id="userPhoto${data.data.id_photo}">
                                <div class="d-flex mr-3 userPhoto" style="background-image: url('./../upload/profile/${user.profile_photo}'); overflow:hidden; max-width: 100%; max-height:100%; background-repeat: no-repeat; background-position:center; background-size:cover; height:50px; width: 50px; border-radius: 50%; cursor:pointer">
                                </div>
                                <div class="media-body">
                                    <small style="font-size: 20px;cursor:pointer" class="userPhoto font-weight-bold"> ${user.name}</small>
                                    <small class="mt-1 float-right"><i class="icon ion-md-time"></i><span>${time} ago</span></small>
                                </div>
                            </div><!--/ media -->
                        <div class="border-bottom pb-1 mb-0">
                                <h5 class="text-center mb-0">${data.data.name}</h5>
                        </div>
                        </div>
                        <div id="photoCard${data.data.id_photo}" class="card-body p-0" style="background-image: url('./../upload/userPhotos/${data.data.user}/${data.data.path}'); overflow:hidden; max-width: 100%; max-height:100%; background-repeat: no-repeat; background-position:center; background-size:cover; height:300px; cursor:pointer">
                        </div>
                        <div class="card-footer bg-white mx-3 p-0">
                            <div>
                                <label class="h6 mt-1">
                                    <p class="font-weight-normal m-0 border-bottom mt-1 pb-1">${data.data.description}</p>
                                </label>
                            </div>
                            <ul class="list-inline m-0">
                                <li class="list-inline-item mt-2"><a><i id="iconLikes${data.data.id_photo}" data-id="${data.data.id_photo}" class="${islike} fa-thumbs-up"></i><span id="countLikes${data.data.id_photo}"> ${data.countLikes}</span></a></li>
                                <li class="list-inline-item mt-2"><a><i class="fa fa-comments"></i><span id="countComment${data.data.id_photo}"> ${data.countComments}</span></a></li>
                            </ul>
                        </div>
                        <div class="input-group mt-2">
                            <input id="inputComment${data.data.id_photo}" type="text" class="form-control" placeholder="Write a comment" aria-label="Recipient's username" aria-describedby="button-addon2">
                            <div class="input-group-append">
                                <button id="btn-AddComment${data.data.id_photo}" class="btn-AddComment btn btn-outline-success" type="button"  data-id="${data.data.id_photo}" ><i class="fa fa-share-square"></i></button>
                            </div>
                        </div>
                    </div>   `);
                

                $('#btn-AddComment'+data.data.id_photo).click(function(){
                    addComment($(this).data('id'), $('#inputComment'+$(this).data('id')).val());
                });   
                $('#userPhoto'+data.data.id_photo).click(function(){
                    document.location.href = 'profileUser.html?id='+data.data.id_photo;
                });
                $("#photoCard"+data.data.id_photo).click(function() {
                    modal.style.display = "block";
                    openPhotoModal(data.data);
                });

                $('#iconLikes'+data.data.id_photo).click( async function(){
                    if($(this).hasClass('far')){
                        if(addLike($(this).data('id'))){
                            $(this).removeClass('far');
                            $(this).addClass('fas');
                            $('#countLikes'+$(this).data('id')).html(' '+ await getCountLikesByPhoto($(this).data('id')));
                        }
                    }else{
                        if(removeLike($(this).data('id'))){
                            $(this).removeClass('fas');
                            $(this).addClass('far');
                            $('#countLikes'+$(this).data('id')).html(' ' + await getCountLikesByPhoto($(this).data('id')))
                        }
                    }
                });
                initFunctionsCard();
}