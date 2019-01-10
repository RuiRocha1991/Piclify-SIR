var token =document.cookie.replace('token=', '');

$(document).ready(async function(){
    window.$_GET = new URLSearchParams(location.search);
    getDetailsUser($_GET.get('id'));
    getNumberFollowers($_GET.get('id'));
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
});

function initFunctionToElements(){
    $('#btn-follower').click(function(){
        if($('#btn-follower').html()=='Do not Follow'){
            removeFollower();
        }else{
            addFollower();
        }
    })
}
