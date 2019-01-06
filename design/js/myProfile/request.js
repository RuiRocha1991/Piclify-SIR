function createNewAlbum(){
    var description = $('#newAlbum').val();
    if(description !== ''){
        $.ajax({
            url:'http://localhost:3000/album/createAlbum',
            type: "post",
            data: {description: description, token:token} ,
            dataType:'json',
            success: function (res) {
                $('#newAlbum').val('');
                ListAlbums=res;
                fillListAlbums(res);
            },
            error: function (errorMessage) {
                alert(errorMessage);
            }
        });
    }
}

function createNewGroup(){
    var title = $('#formIdTitleGroup').val();
    var description =$('#formIdDescriptionGroup').val(); 
    if(title !== '' && description!==''){
        $.ajax({
            url:'http://localhost:3000/group/createGroup',
            type: "post",
            data: {title: title,description: description, token:token} ,
            dataType:'json',
            success: function (res) {
                addGroupToFollower(res);
                $('#formIdTitleGroup').val('');
                $('#formIdDescriptionGroup').val('');
            },
            error: function (errorMessage) {
                alert(errorMessage);
            }
        });
    }
}

function addGroupToFollower(res){
    $.ajax({
        url:'http://localhost:3000/groupUser/addUserToGroup',
        type: "post",
        data: {group: res[0].id_group, token:token} ,
        dataType:'json',
        success: function (res) {
            getGroupsDetailsByUser(res);
        },
        error: function (errorMessage) {
            alert(errorMessage);
        }
    });
}

function getNumberFollowers(id){
    $.ajax({
        url:'http://localhost:3000/user/getFollowers',
        type: "get",
        data: {id_user: id, token:token} ,
        dataType:'json',
        success: function (res) {
            $('#lb-followers').text(res[0].followers+' followers');
        },
        error: function (errorMessage) {
            alert(errorMessage);
        }
    });
}

function getListAlbums(id){
    console.log(id);
    console.log(token);
    $.ajax({
        url:'http://localhost:3000/album/getListAlbums',
        type: "get",
        data: {id_user: id, token:token},
        dataType:'json',
        success: function (res) {
            ListAlbums=res;
            fillListAlbums(res);
        },
        error: function (errorMessage) {
            console.log(errorMessage);
            alert(errorMessage);
        }
    });
}

function getListGroups(id){
    $.ajax({
        url:'http://localhost:3000/groupUser/getListGroupsByUser',
        type: "get",
        data: {user: id,token:token} ,
        dataType:'json',
        success: function (res) {
            getGroupsDetailsByUser(res);
        },
        error: function (errorMessage) {
            alert(errorMessage);
        }
    });
}

async function getGroupsDetailsByUser(res){
    $('#listGroups li').remove();
    var list= new Array();
    for(var i=0; i<res.length;i++){
       await $.ajax({
            url:'http://localhost:3000/group/getListGroupById',
            type: "get",
            data: {id_group: res[i].idGroup, token:token} ,
            dataType:'json',
            success: function (res) {
                ListGroups.push(res[0]);
                list.push(res[0]);
            },
            error: function (errorMessage) {
                alert(errorMessage);
            }
        });
    }
    fillListGroups(list);
}

function getPhotosByUser(){
    $.ajax({
        url:'http://localhost:3000/photo/getPhotosByUser',
        type: "get",
        data: {token:token},
        dataType: 'json',
        success: function(res) {
            //fillUserPhotos(res);
            getCountLikes(res);
        },
        error: function(errorMessage){
            console.log("Erro ao carregar a foto");
            alert(errorMessage);
        }
    })
}

function getCountLikes(data){
    $('#photosContainer .card').remove();
    for(var i=0; i<data.length; i++){
        $.ajax({
            async: false,
            url:'http://localhost:3000/likesPhoto/getCountLikes',
            type: "get",
            data:{token:token, id_photo:data[i].id_photo},
            dataType: 'json',
            success: function(res){
                var result={data:data[i], countLikes : res[0].countLikes};
                getCountComments(result);
            },
            error: function(errorMessage){
                console.log("Erro ao carregar a foto");
                alert(errorMessage);
            }
        })
    }
    initFunctionsCard()
    
}

function getCountComments(data){
    $.ajax({
        async: false,
        url:'http://localhost:3000/commentsPhoto/getCountComments',
        type: "get",
        data:{token:token, id_photo:data.data.id_photo},
        dataType: 'json',
        success: function(res){
            var result ={data:data.data, countLikes : data.countLikes, countComments: res[0].countComments};
            getCountAlbumsByPhoto(result);
        },
        error: function(errorMessage){
            console.log("Erro ao carregar a foto");
            alert(errorMessage);
        }
    })
    
    
}



function getCountAlbumsByPhoto(data){
    $.ajax({
        async: false,
        url:'http://localhost:3000/albumsPhoto/getCountAlbumsByPhoto',
        type: "get",
        data:{token:token, id_photo:data.data.id_photo},
        dataType: 'json',
        success: function(res){
            var result ={data:data.data, countLikes : data.countLikes, countComments: data.countComments, countAlbums:res[0].countAlbums};
            getCountGroupsByPhoto(result);
        },
        error: function(errorMessage){
            console.log("Erro ao carregar a foto");
            alert(errorMessage);
        }
    })
    
    
}

function getCountGroupsByPhoto(data){
    $.ajax({
        async: false,
        url:'http://localhost:3000/groupsPhoto/getCountGroupsByPhoto',
        type: "get",
        data:{token:token, id_photo:data.data.id_photo},
        dataType: 'json',
        success: function(res){
            var result ={
                data:data.data, 
                countLikes : data.countLikes, 
                countComments: data.countComments, 
                countAlbums:data.countAlbums,
                countGroups: res[0].countGroups};
            fillUserPhotos(result);
        },
        error: function(errorMessage){
            console.log("Erro ao carregar a foto");
            alert(errorMessage);
        }
    })  
}

function getPhotoById(id){
    var photo;
    $.ajax({
        async:false,
        url:'http://localhost:3000/photo/getPhotoById',
        type: "get",
        data:{token:token, id_photo:id},
        dataType: 'json',
        success: function(res){
            photo= res[0];
        },
        error: function(errorMessage){
            console.log("Erro ao carregar a foto");
            alert(errorMessage);
        }
    })
    return photo
}

function updatePhoto(id){
    let photo = getPhotoById(id)
    photo.name = $('#photoName-'+ id).val()
    photo.description = $('#photoDescription-'+ id).val()
    photo.is_private = $('#photoIsPrivate-'+id).is(":checked")?1:0;
    
    $.ajax({
        url:'http://localhost:3000/photo/update_photo',
        type: "post",
        data:{
            token:token, 
            id_photo:id, 
            name:photo.name,
            description: photo.description,
            is_private: photo.is_private
        },
        dataType: 'json',
        success: function(res){
           console.log(res)
        },
        error: function(errorMessage){
            console.log("Erro ao carregar a foto");
            alert(errorMessage);
        }
    })
 
}