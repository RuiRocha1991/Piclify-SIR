var token =document.cookie.replace('token=', '');
var ListAlbums;
var ListGroups= new Array();

$(document).ready(function(){
    var data = {token:token};
    $.ajax({
        url:'http://localhost:3000/user',
        type: "get",
        data: data ,
        dataType:'json',
        success: function (res) {
            fillProfileDetails(res[0]);
            getNumberFollowers(res[0].id_user);
            getListAlbums(res[0].id_user);
            getListGroups(res[0].id_user);
            getPhotosByUser();
        },
        error: function (errorMessage) {
            logout();
            document.location.href = 'login.html';
        }
    });

    

    

    

});

function showModalEditAlbums(data){
    console.log(data);
}

function saveAlbunsOfPhoto(){
    console.log('chegou');
}

function saveGroupsOfPhoto(){
    console.log('chegou');
}

function initFunctionsCard(){
    $('.card').hover(function(){
        $(this).addClass('shadow');
    },function(){
        $(this).removeClass('shadow');
    }); 
    initFunctionName()
    initFunctionDescription()
    initFunctionIsPrivate()
    initFunctionAlbums()
    initFunctionGroups()
    
}

function initFunctionName(){
    $('.btn-edit-name').click(function(){
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

function initFunctionDescription(){
    $('.btn-edit-description').click(function(){
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

function initFunctionIsPrivate(){
    $('.checkbox-photo').change(function() {
        let id_photo = $(this).parent().parent().parent().parent().parent().parent().data('id');

        if(this.checked) {
            updatePhoto(id_photo)
        } else{
            updatePhoto(id_photo)
        }      
    });
}

function initFunctionAlbums(){
    $('.albums').click(async function(){
        let id_photo = $(this).parent().parent().parent().data('id');
        let albumsByPhoto =await getAlbumsByPhoto(id_photo)
        $('#modal-edit-albums').modal('show');
        $('#modal-body-albums').attr("data-id",id_photo);
        fillModalWithPhotoAlbums(ListAlbums, albumsByPhoto,id_photo);
    })
}

function initFunctionGroups(){
    $('.groups').click(function(){
        $('#modal-edit-groups').modal('show');
        $('#modal-body-groups').attr("data-id",$(this).data('id'));
        fillModalWithPhotoGroups(ListGroups);
    });
}
