function logout(){
    $.ajax({
        url:window.CONNECTION_NODE+'/user/logout',
        type: "POST",
        dataType:'json',
        success: function (res) {
            if(res.message==='ok'){
                deleteAllCookies();
                document.location.href = 'index.html';
            }
        },
        error: function (errorMessage) {
            alert(errorMessage);
        }
    });
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}