function openPhotoModal(data,user){

    var time = calculateTimeOfUpload(data.data.date_upload);
    $('#modalPhoto').append(`<i id="closeModal" class="fa fa-times fa-2x" style="position: absolute; top: 5px;right: 5px; color:lightgray"></i>
                        <div class="modalPhoto">
                            <div class="w3-col photo" style="width:70%; background-color: black;">
                                <div style="background-image: url('./../upload/userPhotos/${data.data.user}/${data.data.path}');       overflow:hidden; max-width: 100%; max-height:100%; background-repeat: no-repeat;                            background-position:center; background-size:contain; height:100%; width: 100%;">
                                </div>
                            </div>
                            <div class="w3-col" style="width:30%;">
                                <div class="info-user-photo" style="height:20%;  border-bottom: 2px solid lightgrey;">
                                    <div class="details-user" style="height:35%; padding:10px;">
                                            <div class="user-photo" class="w3-col" style="width:20%;">
                                                <div class="w3-col" style="background-image: url('./../upload/profile/${user.profile_photo}'); overflow:hidden; max-width: 100%; max-height:100%; background-repeat: no-repeat; background-position:center; background-size:cover; height:50px; width: 50px; border-radius: 100%; cursor:pointer">
                                                </div>
                                            </div>
                                            <div class="w3-col" style="width:80%; margin-top:10px; margin-left:10px">
                                                <small style="font-size: 20px;font-weight: bold;cursor:pointer" >${user.name}</small>
                                                <small class="mt-1 float-right mr-3 ml-3"><i class="icon ion-md-time "></i><span>${time}</span></small>
                                            </div>
                                    </div>
                                    <div class="description-photo" style="height:65%;">
                                    
                                    </div>
                                </div>
                                <div class="likes-comments-number" style="height:5%; border-bottom: 2px solid lightgrey;">
                                    <div class="w3-col" style="width:50%; justify-content: center; align-content: center">
                                            <a><i class="fa fa-thumbs-up fa-2x ml-5"></i><span style="font-size: 20px"> Like</span></a>
                                    </div>
                                    <div class="w3-col" style="width:50%; justify-content: center; align-content: center">
                                            <a><i class="fa fa-comments fa-2x ml-5"></i><span style="font-size: 20px"> Comment</span></a>
                                    </div>
                                </div>
                                <div class="comments-photo" style="height:65%; background-color: white;padding:10px;">
                                    <div style="border-radius:10px;min-height:100px;border-bottom: 2px solid lightgrey; background-color: red;">
                                        <div class="details-user" style="height:35%; padding:10px;">
                                            <div class="w3-col" style="width:20%;">
                                                <div class="w3-col" style="background-image: url('./../upload/profile/${user.profile_photo}'); overflow:hidden; max-width: 100%; max-height:100%; background-repeat: no-repeat; background-position:center; background-size:cover; height:25px; width: 25px; border-radius: 100%; cursor:pointer">
                                                </div>
                                            </div>
                                            <div class="w3-col" style="width:80%; background-color:blue;">
                                                <small style="font-size: 20px;font-weight: bold;cursor:pointer" >${user.name}</small>
                                                <small class="mt-1 float-right mr-1 ml-3"><i class="icon ion-md-time "></i><span>${time}</span></small>
                                            </div>
                                        </div>
                                        <div class="description-photo" style="height:65%;">
                                        </div>
                                    </div>
                                </div>
                                <div class="add-comment" style="height:10%; background-color:  lightgrey; padding-left:10px; padding-top: 10px">
                                        <div class="w3-col" style="width:20%; ">
                                                <div class="user-photo" style="background-image: url('./../upload/profile/25'); overflow:hidden; max-width: 100%; max-height:100%; background-repeat: no-repeat;                            background-position:center; background-size:cover; height:50px; width: 50px; border-radius: 100%; cursor:pointer">
                                                </div>
                                            </div>
                                            <div class="w3-col" style="width:80%; padding-top:2px">
                                                <input type="text" placeholder="Write a comment" style="border-radius: 18px; margin-left: 10px; width: 90%; height: 40px; padding-left:5%">
                                            </div>
                                </div>
                            </div>
                                        
                        </div>`);
                    $(".userPhoto").css( 'cursor', 'pointer' );
                    $('.userPhoto').click(function(){
                        document.location.href = 'profileUser.html?id='+$(this).data('id');
                    });
}

