$(document).ready(function(){
    
    $('.publishCard').hover(function(){
        $(this).removeClass('shadow');
        $(this).addClass('cardHover shadow-lg');
        
    },function(){
        $(this).removeClass('cardHover shadow-lg');
        $(this).addClass('shadow');
    });
});

$('.profile-nav').click(function(){
    $(this).css("color", "white");
});
