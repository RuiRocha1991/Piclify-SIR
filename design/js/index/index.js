var token =document.cookie.replace('token=', '');
$(document).ready(function(){
    $('.card').hover(function(){
        $(this).addClass('shadow');
    },function(){
        $(this).removeClass('shadow');
    }); 
    $('.profile-nav').click(function(){
        $(this).css("color", "white");
    });

});