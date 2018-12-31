
$(document).ready(function(){
    var token =document.cookie.replace('token=', '');
    var data = {token:token};
    $.ajax({
        url:'http://localhost:3000/user',
        type: "get",
        data: data ,
        dataType:'json',
        success: function (res) {
            fillProfileDetails(res[0]);
            getNumberFollowers(res[0].id_user);
        },
        error: function (errorMessage) {
            alert(errorMessage);
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
        $('#modal-edit-albums').modal('show');
        console.log($(this).data('id'));
    })

});

function showModalEditAlbums(data){
    console.log(data);
}

function fillProfileDetails(data){
    var photo =data.profile_photo =='' ? 'no-photo.png': data.profile_photo;
    $('#profile-photo').attr('src','../upload/profile/'+photo);
    $('#lb-name').text(data.name);
    $('#lb-email').text(data.email);
    $('#input-id_user').val(data.id_user);
    $('#form-id_user').val(data.id_user);
   
}

function getNumberFollowers(id){
    $.ajax({
        url:'http://localhost:3000/user/getFollowers',
        type: "get",
        data: {id_user: id} ,
        dataType:'json',
        success: function (res) {
            $('#lb-followers').text(res[0].followers+' followers');
        },
        error: function (errorMessage) {
            alert(errorMessage);
        }
    });
}

function saveAlbunsOfPhoto(){
    console.log('chegou');
}