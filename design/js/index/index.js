var token =document.cookie.replace('token=', '');
var listPhotos=new Array();
var countLoad =0;
var rangeLoad=3;
var countuploadedPhotos=6;

$(document).ready(async function(){
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

function initFunctionsIndex(id){
    $('#card'+id).hover(function(){
        $(this).addClass('shadow');
    },function(){
        $(this).removeClass('shadow');
    }); 
    $('#btn-AddComment'+id).click(function(){
        if($('#inputComment'+$(this).data('id')).val() != ""){
            addComment($(this).data('id'), $('#inputComment'+$(this).data('id')).val());
        }
    });
    $('#iconLike'+id).click( async function(){
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

    $('#photo'+id).click(function(){
        console.log("abrir aqui o modal");
        //select photo.path, photo.name, user.name, user.path .....
        //select * from comments where id_photo=id
    })
}