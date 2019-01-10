function addCardToGroup(data,user){
    var time = calculateTimeOfUpload(data.data.date_upload);
    $('#container').append(`<div class="card mx-3 p-0 mb-4 col-xl-5 col-lg-5 col-md-5 col-sm-11 border rounded" data-id="${data.data.id_photo}"> <!--Start Card-->
                        <div class="card-header bg-white">
                            <div class="media m-0">
                                <div class="d-flex mr-1" style="background-image: url('./../upload/profile/${user.profile_photo}'); overflow:hidden; max-width: 100%; max-height:100%; background-repeat: no-repeat; background-position:center; background-size:cover; height:50px; width: 50px; border-radius: 50%">
                                </div>
                                <div class="media-body">
                                    <small style="font-size:20px" class=""> ${user.name}</small>
                                    <small class="mt-1 float-right"><i class="icon ion-md-time"></i><span>${time} ago</span></small>
                                </div>
                            </div><!--/ media -->
                        <div class="border-bottom pb-1 mb-0">
                                <h5 class="text-center mb-0">${data.data.name}</h5>
                        </div>
                        </div>
                        <div class="card-body p-0" style="background-image: url('./../upload/userPhotos/${data.data.user}/${data.data.path}'); overflow:hidden; max-width: 100%; max-height:100%; background-repeat: no-repeat; background-position:center; background-size:cover; height:300px">
                        </div>
                        <div class="card-footer bg-white mx-3 p-0">
                            <div>
                                <label class="h6 mt-1">
                                    <p class="font-weight-normal m-0 border-bottom mt-1 pb-1">${data.data.description}</p>
                                </label>
                            </div>
                            <ul class="list-inline m-0">
                                <li class="list-inline-item mt-2"><a><i class="fa fa-thumbs-up"></i><span> ${data.countLikes}</span></a></li>
                                <li class="list-inline-item mt-2"><a><i class="fa fa-comments"></i><span> ${data.countComments}</span></a></li>
                            </ul>
                        </div>
                        <div class="input-group mt-2">
                            <input type="text" class="form-control" placeholder="Write a comment" aria-label="Recipient's username" aria-describedby="button-addon2">
                            <div class="input-group-append">
                                <button class="btn btn-outline-success" type="button" id="button-addon2"><i class="fa fa-share-square"></i></button>
                            </div>
                        </div>
                    </div>   `);
}