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
        },
        error: function (errorMessage) {
            logout();
            document.location.href = 'login.html';
        }
    });

    $('.card').hover(function(){
        $(this).addClass('shadow');
    },function(){
        $(this).removeClass('shadow');
    }); 

    $('.btn-edit-name').click(function(){
        let parent= $(this).parent().parent();
        let input= parent[0].children[0];

        if(parent[0].children[0].disabled == true){
            $(input).prop('disabled', false);
            $(input).select();
            $(this).find('i').removeClass('fa-edit');
            $(this).find('i').addClass('fa-save');
            console.log($(input).data('id'));
        }else{
            $(input).prop('disabled', true);
            $(this).find('i').addClass('fa-edit');
            $(this).find('i').removeClass('fa-save');
            console.log($(input).val());
            //create function to save new name
        }
    });

    $('.btn-edit-description').click(function(){
        let parent= $(this).parent().parent();
        let input= parent[0].children[0];
        if(input.disabled == true){
            $(input).prop('disabled', false);
            $(input).select();
            $(this).find('i').removeClass('fa-edit');
            $(this).find('i').addClass('fa-save');
            console.log($(input).data('id'));
        }else{
            $(input).prop('disabled', true);
            $(this).find('i').addClass('fa-edit');
            $(this).find('i').removeClass('fa-save');
            console.log($(input).val());
            //create a function to save descrition
        }
    })

    $('.albums').click(function(){
        console.log('chamou');
        $('#modal-edit-albums').modal('show');
        $('#modal-body-albums').attr("data-id",$(this).data('id'));
        fillModalToSelectAlbums(ListAlbums);
    })

    $('.groups').click(function(){
        $('#modal-edit-groups').modal('show');
        $('#modal-body-groups').attr("data-id",$(this).data('id'));
        fillModalToSelectGroups(ListGroups);
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
