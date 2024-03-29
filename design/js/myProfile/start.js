var token =document.cookie.replace('token=', '');
var ListAlbums;
var listPhotos=new Array();
var ListGroups= new Array();
var countLoad =0;
var rangeLoad=2;
var countuploadedPhotos=4;
var modal;
$(document).ready(function(){
    var data = {token:token};
    $.ajax({
        url:window.CONNECTION_NODE+'/user',
        type: "get",
        data: data ,
        dataType:'json',
        success: function (res) {
            fillProfileDetails(res[0]);
            getListAlbums(res[0].id_user);
            getListGroups(res[0].id_user);
            getPhotosToMyProfile();
        },
        error: function (errorMessage) {
            logout();
            document.location.href = 'login.html';
        }
    });
    $(window).scroll(function() {
        if($(window).scrollTop() == $(document).height() - $(window).height()) {
           if(countuploadedPhotos-rangeLoad < listPhotos.length){
                loadPhotos(listPhotos);
           }
        }
    });

    modal= document.getElementById('modalPhoto');
    window.onclick = function(event){
        if(event.target ==modal){
            modal.style.display = "none"
        }
    }

  

});


function initFunctionsCard(data){
    $('#card'+data.id_photo).hover(function(){
        $(this).addClass('shadow');
    },function(){
        $(this).removeClass('shadow');
    }); 

    $('#photoCard'+data.id_photo).click(function(){
        modal.style.display = "block";
        openPhotoModal(data);
    });

    initFunctionName(data.id_photo);
    initFunctionDescription(data.id_photo);
    initFunctionIsPrivate(data.id_photo);
    initFunctionAlbums(data.id_photo);
    initFunctionGroups(data.id_photo);
    
}

function initFunctionName(id){
    $('#btn-edit-name'+id).click(function(){
        let parent = $(this).parent().parent();
        let input = parent[0].children[0];
        let id_photo = $(this).parent().parent().parent().parent().data("id");

        if(input.disabled == true){
            $(input).prop('disabled', false );
            $(this).find('i').removeClass('fa-edit');
            $(this).find('i').addClass('fa-save');
            $(input).select();
        } else{
            $(input).prop('disabled', true);
            $(this).find('i').addClass('fa-edit');
            $(this).find('i').removeClass('fa-save') ;
            updatePhoto(id_photo);
        }
    })
}

function initFunctionDescription(id){
    $('#btn-edit-description'+id).click(function(){
        let parent = $(this).parent().parent();
        let input = parent[0].children[0];
        let id_photo = $(this).parent().parent().parent().parent().data("id");

        if(input.disabled == true){
            $(input).prop('disabled', false )
            $(this).find('i').removeClass('fa-edit')
            $(this).find('i').addClass('fa-save')
            $(input).select();
        } else{
            $(input).prop('disabled', true)
            $(this).find('i').addClass('fa-edit')
            $(this).find('i').removeClass('fa-save') 
            updatePhoto(id_photo)
        }
    })
}

function initFunctionIsPrivate(id){
    $('#photoIsPrivate-'+id).change(function() {
        let id_photo = $(this).parent().parent().parent().parent().parent().parent().data('id');
        if(this.checked) {
            updatePhoto(id_photo)
        } else{
            updatePhoto(id_photo)
        }      
    });
}

function initFunctionAlbums(id){
    $('#albums'+id).click(async function(){
        let id_photo = $(this).parent().parent().parent().data('id');
        let albumsByPhoto =await getAlbumsByPhoto(id_photo)
        $('#modal-edit-albums').modal('show');
        $('#modal-body-albums').attr("data-id",id_photo);
        fillModalWithPhotoAlbums(ListAlbums, albumsByPhoto,id_photo);
    })
}

function initFunctionGroups(id){
    $('#groups'+id).click(async function(){
        let id_photo = $(this).parent().parent().parent().data('id');
        let groupsByPhoto =await getGroupsByPhoto(id_photo)
        $('#modal-edit-groups').modal('show');
        $('#modal-body-groups').attr("data-id",id_photo);
        fillModalWithPhotoGroups(ListGroups, groupsByPhoto, id_photo);
    });
}
