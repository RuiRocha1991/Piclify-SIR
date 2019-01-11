var listResult = new Array();
listResult['users']=new Array();
listResult['groups']=new Array();

async function searchUserAndGroup(){
    if(listResult['users'].length >0){
        listResult['users'].splice(0,listResult['users'].length);
    }
    if(listResult['groups'].length>0){
        listResult['groups'].splice(0,listResult['groups'].length);
    }

    var users= await getUserByNameEmailCountryLocality();
    if(users.length>0){
        listResult['users']=users;
    }
    var groups = await getGroupByTitleOrDescription();
    if(groups.length>0){
        listResult['groups']=groups;
    }
    fillAutoComplete(listResult);
}

async function getUserByNameEmailCountryLocality(){
    let users;
    await $.ajax({
        url:window.CONNECTION_NODE+'/user/getUserByNameEmailCountryLocality',
        type: "get",
        data: {
            token:token, 
            name: $('#search').val(),
            email:$('#search').val(),
            locality:$('#search').val(),
            country:$('#search').val()
        } ,
        dataType:'json',
        success: function (res) {
            users=res;
        },
        error: function (errorMessage) {
            console.log(errorMessage);
        }
    });
    return users;
}

async function getGroupByTitleOrDescription(){
    let groups;
    await $.ajax({
        url:window.CONNECTION_NODE+'/group/getGroupByTitleOrDescription',
        type: "get",
        data: {
            token:token, 
            title: $('#search').val(),
            description:$('#search').val()
        } ,
        dataType:'json',
        success: function (res) {
            groups=res;
        },
        error: function (errorMessage) {
            console.log(errorMessage);
        }
    });
    return groups;
}
