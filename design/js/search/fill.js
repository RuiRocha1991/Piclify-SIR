$(document).ready(function(){
    $('#search').keyup(function(e){
        if($(this).val()==''){
            $('#autoComplete').css('visibility','hidden');
        }else{
            $('#autoComplete').css('visibility','visible');
        }
        if ( $(this).val()!= ''){
            searchUserAndGroup();
        }
        
    });
});

function fillAutoComplete(data){
    $('#autoComplete a').remove();

    if(data['users'].length>0){
        $('#autoComplete').append(`<a href="#" class="list-group-item list-group-item-action rounded disabled text-center font-weight-bold">Users</a>`);
        for(var i=0; i<data['users'].length; i++){
            $('#autoComplete').append(`<a  href="profileUser.html?id=${data['users'][i].id_user}" class="list-group-item list-group-item-action rounded">${data['users'][i].name}</a>`);
        }
    }
    if(data['groups'].length>0){
        $('#autoComplete').append(`<a href="#" class="list-group-item list-group-item-action rounded disabled text-center font-weight-bold">Groups</a>`);
        for(var i=0; i<data['groups'].length; i++){
            $('#autoComplete').append(`<a  href="groups.html?id=${data['groups'][i].id_group}" class="list-group-item list-group-item-action rounded">${data['groups'][i].title}</a>`);
        }
    }

}