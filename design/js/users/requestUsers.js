async function getDetailsUser(id){
    var user
    await $.ajax({
        url:window.CONNECTION_NODE+'/user/getDetailsUserById',
        type: "get",
        data: {token:token, id_user: id} ,
        dataType:'json',
        success: function (res) {
            user = res[0]
        },
        error: function (errorMessage) {
            logout();
            document.location.href = 'login.html';
        }
    });
    return user
}