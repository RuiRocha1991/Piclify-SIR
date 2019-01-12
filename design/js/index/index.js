var token =document.cookie.replace('token=', '');
var listPhotos=new Array();
var countLoad =0;
var rangeLoad=3;
var countuploadedPhotos=6;
var modal;
$(document).ready(async function(){
    modal= document.getElementById('modalPhoto');
    window.onclick = function(event){
        if(event.target ==modal){
            modal.style.display = "none"
        }
    }
    $('.profile-nav').click(function(){
        $(this).css("color", "white");
    });

    $(window).scroll(function() {
        if($(window).scrollTop() == $(document).height() - $(window).height()) {
           if(countuploadedPhotos-rangeLoad < listPhotos.length){
                loadPhotos(listPhotos);
           }
        }
    });

    listPhotos= await getPhotosMyFollowedAndMY();
    loadPhotos(listPhotos);
});

function initFunctionsIndex(data){
    $('#card'+data.id_photo).hover(function(){
        $(this).addClass('shadow');
    },function(){
        $(this).removeClass('shadow');
    }); 
    $('#btn-AddComment'+data.id_photo).click(function(){
        if($('#inputComment'+$(this).data('id')).val() != ""){
            addComment($(this).data('id'), $('#inputComment'+$(this).data('id')).val());
        }
    });
    $('#iconLike'+data.id_photo).click( async function(){
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

    $('#photo'+data.id_photo).click(function(){
        modal.style.display = "block";
        openPhotoModal(data);
    });
}