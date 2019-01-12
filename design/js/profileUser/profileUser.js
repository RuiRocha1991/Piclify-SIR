var token =document.cookie.replace('token=', '');
var listPhotos=new Array();
var countLoad =0;
var rangeLoad=2;
var countuploadedPhotos=4;
var user;

$(document).ready(async function(){
    window.$_GET = new URLSearchParams(location.search);
    getDetailsUser($_GET.get('id'));
   // getNumberFollowers($_GET.get('id'));
    getListAlbums($_GET.get('id'));
    getListGroups($_GET.get('id'));
    let result =await verifyIsFollowed($_GET.get('id'));
    if(result[0].isFollower == 1){
        $('#btn-follower').html('Do not Follow');
        getPhotosByIdUser($_GET.get('id'), true);
    }else{
        $('#btn-follower').html('Follow');
        getPhotosByIdUser($_GET.get('id'), false);
    }
    initFunctionToElements();
    $(window).scroll(function() {
        if($(window).scrollTop() == $(document).height() - $(window).height()) {
           if(countuploadedPhotos-rangeLoad < listPhotos.length){
                loadPhotos(listPhotos, user);
           }
        }
    });
});

function initFunctionToElements(){
    $('#btn-follower').click(function(){
        if($('#btn-follower').html()=='Do not Follow'){
            removeFollower();
        }else{
            addFollower();
        }
        $('#container .card').remove();
        countLoad =0;
        countuploadedPhotos=4;
    })
}

function initFunctionsProfileUser(id){
    $('#card'+id).hover(function(){
        $(this).addClass('shadow');
    },function(){
        $(this).removeClass('shadow');
    }); 
    $('#btn-AddComment'+id).click(function(){
        addComment($(this).data('id'), $('#inputComment'+$(this).data('id')).val());
    });
    $('#iconLikes'+id).click( async function(){
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
}
