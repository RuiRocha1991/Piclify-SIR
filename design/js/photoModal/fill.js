function openPhotoModal(data,user){
    $('#modalPhoto .myModal').remove();
    var time = calculateTimeOfUpload(data.data.date_upload);
    $('#modalPhoto').append(`<div class="myModal">
                        <i id="closeModal" class="fa fa-times fa-2x" style="position: absolute; top: 5px;right: 5px; color:lightgray"></i>
                        <div class="modalPhoto">
                            <div class="w3-col photo" style="width:70%; background-color: black;">
                                <div style="background-image: url('./../upload/userPhotos/${data.data.user}/${data.data.path}'); overflow:hidden; max-width: 100%; max-height:100%; background-repeat: no-repeat;     background-position:center; background-size:contain; height:100%; width: 100%;">
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
                                    <div class="description-photo" style="height:65%; padding:10px">
                                        <small style="font-size: 12px;" >${data.data.description}</small>
                                    </div>
                                </div>
                                <div class="likes-comments-number" style="height:5%; border-bottom: 2px solid lightgrey;">
                                    <div class="w3-col" style="width:50%; justify-content: center; align-content: center">
                                            <a><i class="fa fa-thumbs-up fa-2x ml-5"></i><span style="font-size: 20px">${data.countLikes} Like</span></a>
                                    </div>
                                    <div class="w3-col" style="width:50%; justify-content: center; align-content: center">
                                            <a><i class="fa fa-comments fa-2x ml-5"></i><span style="font-size: 20px">${data.countComments} Comment</span></a>
                                    </div>
                                </div>
                                <div id="comments" class="comments-photo" style="height:68%; background-color: white;padding:10px; overflow: auto;">
                                    
                                </div>                                
                                <div class="add-comment" style="height:7%; background-color:  lightgrey; padding-left:10px; padding:5px">
                                        
                                            <div class="w3-col" style="width:80%; padding-top:2px">
                                                <input id="textAreaComment${data.data.id_photo}" data-id="${data.data.id_photo}" type="text" placeholder="Write a comment" style="border-radius: 10px; margin-left: 10px; width: 95%; height: 40px; padding-left:5%">
                                            </div>
                                            <div  class="w3-col" style="width:20%; padding-top:2px">
                                                <button id="sendButton${data.data.id_photo}"  style="border-radius: 5px; width: 100%; height: 40px; background-color:rgb(26,35,126); color: white;" >Send</button>
                                            </div>
                                </div>
                            </div>
                                        
                        </div>
                    </div> `
        );
    $(".userPhoto").css( 'cursor', 'pointer' );
    $('.userPhoto').click(function(){
        document.location.href = 'profileUser.html?id='+$(this).data('id');
    });
    $("#sendButton"+data.data.id_photo).click(function(){
        if($('#textAreaComment'+data.data.id_photo).val()!=''){
            addComment(data.data.id_photo, $('#textAreaComment'+data.data.id_photo).val());
            $('#textAreaComment'+data.data.id_photo).val('');
            //$('#comments div').remove();
            getComments(data.data.id_photo);
        }
        
    });
    getComments(data.data.id_photo);
}

function fillComments(data){
    var time = calculateTimeOfUpload(data.date);
    $('#comments').append(`<div class="comments" style="min-height:75px; background-color: lightgrey; margin-bottom:10px;padding:10px; border-radius:10px;">
                <div class="details-user" style="height:35%; ">
                    <div class="w3-col" style="width:10%;">
                        <div class="w3-col" style="background-image: url('./../upload/profile/${data.profile_photo}'); overflow:hidden; max-width: 100%; max-height:100%; background-repeat: no-repeat; background-position:center; background-size:cover; height:25px; width: 25px; border-radius: 100%; cursor:pointer">
                        </div>
                    </div>
                    <div class="w3-col" style="width:90%;">
                        <small style="font-size: 20px;font-weight: bold;cursor:pointer" >${data.name}</small>
                        <small class="mt-1 float-right mr-1 ml-3"><i class="icon ion-md-time "></i><span>${time}</span></small>
                    </div>
                </div>
                <div class="description-photo" style="height:65%; margin:5px;">
                    ${data.text}
                </div>
            </div>`);


}

