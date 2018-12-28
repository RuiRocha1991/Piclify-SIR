
$(document).ready(function(){
    var data = {email:'ruirocha1991@gmail.com'};

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
});

function fillProfileDetails(data){
    $('#profile-photo').attr('src','../upload/profile/'+data.profile_photo+'.png');
    $('#lb-name').text(data.name);
    $('#lb-email').text(data.email);
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