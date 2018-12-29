function login(){
    var date = new Date();
    document.cookie="email = ruirocha1991@gmail.com ; expires="+ date.getDate()+1+";";
    document.location.href = 'index.html';
}

var isPasswordError=false;
var isEmailError=false;
var isPasswordDifferentError=false;



function showFormLogin(){
    $('#container .form').remove();
    $('#container').append('<div id="form-login" class="form col-sm-12 col-md-8 col-lg-6 col-xl-6 text-center border border-black rounded bg-light pb-5"><p class="h4 m-3">Sign in</p><hr><div class="pl-5 pr-5"><input type="email" id="defaultLoginFormEmail" class="form-control mb-4" placeholder="E-mail"><input type="password" id="defaultLoginFormPassword" class="form-control mb-4" placeholder="Password"><div class="d-flex justify-content-around"><div><div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input" id="defaultLoginFormRemember"><label class="custom-control-label" for="defaultLoginFormRemember">Remember me</label></div></div><div><a href="">Forgot password?</a></div></div><button class="btn btn-info btn-block my-4">Sign in</button></div><p>Not a member?<button class="btn btn-info" onclick="showFormRegister()">Register</button></p><p>or sign in with:</p><a type="button" class="light-blue-text mx-2"><i class="fab fa-facebook-f"></i></a><a type="button" class="light-blue-text mx-2"><i class="fab fa-twitter"></i></a><a type="button" class="light-blue-text mx-2"><i class="fab fa-linkedin-in"></i></a><a type="button" class="light-blue-text mx-2"><i class="fab fa-github"></i></a></div>');
}

function showFormRegister(){
    $('#container .form').remove();  
    $('#container').append('<div id="form-register" class="form col-sm-12 col-md-9 col-lg-7 col-xl-7 text-center border border-black rounded bg-light" ><p class="h4 m-3">Sign up</p><hr><div class=" pl-5 pr-5"><div id="form-name" class="form-row mb-4"><div class="col"><input type="text" id="defaultRegisterFormFirstName" class="form-control" placeholder="First name"></div><div class="col"><input type="text" id="defaultRegisterFormLastName" class="form-control" placeholder="Last name"></div></div><input type="email" id="defaultRegisterFormEmail" class="form-control mb-4" placeholder="E-mail"><small id="defaultRegisterFormEmailHelpBlock" class="form-text mb-2 text-danger"> </small><input type="password" id="defaultRegisterFormPassword" class="form-control" placeholder="Password"><small id="defaultRegisterFormPasswordHelpBlock" class="form-text  mb-2">At least 8 characters and 1 digit</small><input type="password" id="defaultRegisterFormPassword2" class=" form-control mb-4" placeholder="Repeat Password"><small id="defaultRegisterFormPassword2HelpBlock" class="form-text mb-2 text-danger"> </small><input type="text" id="defaultRegisterLocality" class=" form-control mb-4" placeholder="Locality"><input type="text" id="defaultRegisterCountry" class=" form-control mb-4" placeholder="Country"><div id="radios" class="text-left  mb-4 "><div class="btn-group btn-group-toggle"  data-toggle="buttons"><label class="btn btn-outline-info active"><input type="radio" name="options" id="option1" value="M" autocomplete="off" checked>Male</label><label class="btn btn-outline-info"><input type="radio" name="options" id="option2" value="F" autocomplete="off">Female</label></div></div><input type="date" id="defaultRegisterBirthDate" class=" form-control mb-4" placeholder="Birth Date"><button id="buttonSubmit" class="btn btn-info my-4 btn-block" onclick="createAccountVerifyEmail()">Sign up</button><small id="defaultRegisterFormButtonHelpBlock" class="form-text mb-2 text-danger"> </small></div><p>or sign up with:</p><a type="button" class="light-blue-text mx-2"><i class="fab fa-facebook-f"></i></a><a type="button" class="light-blue-text mx-2"><i class="fab fa-twitter"></i></a><a type="button" class="light-blue-text mx-2"><i class="fab fa-linkedin-in"></i></a><a type="button" class="light-blue-text mx-2"><i class="fab fa-github"></i></a><hr><p>By clicking <em>Sign up</em> you agree to our<a href="" target="_blank"> terms of service</a></p></div>');

    $('#defaultRegisterFormEmail').focusout(function(){
        verifyEmailIsValid();
    });
    $('#defaultRegisterFormPassword').focusout(function(){
        verifyPasswordIsValid();
    });
    $('#defaultRegisterFormPassword2').focusout(function(){
        verifyPasswordIsEqual();
    });
}

function getDataFromFormRegister(){
    var firstName = $('#defaultRegisterFormFirstName').val();
    var lastName=$('#defaultRegisterFormLastName').val();
    var email = $('#defaultRegisterFormEmail').val();
    var password = $('#defaultRegisterFormPassword').val();
    var passwordReview = $('#defaultRegisterFormPassword2').val();
    var locality = $('#defaultRegisterLocality').val();
    var country = $('#defaultRegisterCountry').val();
    var genre = $('input[name=options]:checked', '#form-register').val()
    var birth_date = $('#defaultRegisterBirthDate').val();
    if(firstName!= '' && lastName!= '' && email!= '' && password!= '' && passwordReview!= '' && locality!= '' && country!= '' && genre!= '' && birth_date!= ''){
        name=firstName + ' '+ lastName;
        return {name,email,password,passwordReview,locality,country,genre,birth_date};
    }else{
        return null;
    }
   
}

function verifyEmailIsValid(){
    var email = $('#defaultRegisterFormEmail').val();
    $('#defaultRegisterFormEmailHelpBlock').text('');
    $('#defaultRegisterFormEmail').addClass('mb-4'); 
    isEmailError=false;
    $.ajax({
        url:'http://localhost:3000/validator/isEmail',
        type: "get",
        data: {email: email} ,
        dataType:'json',
        success: function (result) {
            if(result.length>0){
                $('#defaultRegisterFormEmailHelpBlock').text(result[0].message);
                $('#defaultRegisterFormEmail').removeClass('mb-4'); 
                isEmailError=true;
            }
        },
        error: function (errorMessage) {
            alert(errorMessage);
        }
    });
}

function verifyPasswordIsValid(){
    var password = $('#defaultRegisterFormPassword').val();
    $('#defaultRegisterFormPasswordHelpBlock').text('At least 8 characters and 1 digit');
    $('#defaultRegisterFormPasswordHelpBlock').addClass('text-muted'); 
    $('#defaultRegisterFormPasswordHelpBlock').removeClass('text-danger'); 
    isPasswordError=false;
    $.ajax({
        url:'http://localhost:3000/validator/isPassword',
        type: "get",
        data: {password: password} ,
        dataType:'json',
        success: function (result) {
            if(result.length>0){
                $('#defaultRegisterFormPasswordHelpBlock').text(result[0].message);
                $('#defaultRegisterFormPasswordHelpBlock').removeClass('text-muted'); 
                $('#defaultRegisterFormPasswordHelpBlock').addClass('text-danger');
                isPasswordError=false
            }else{
                $('#defaultRegisterFormPasswordHelpBlock').text('Strong password');
                $('#defaultRegisterFormPasswordHelpBlock').removeClass('text-muted'); 
                $('#defaultRegisterFormPasswordHelpBlock').removeClass('text-danger');
                $('#defaultRegisterFormPasswordHelpBlock').addClass('text-success');
            }
        },
        error: function (errorMessage) {
            alert(errorMessage);
        }
    });
}

function verifyPasswordIsEqual(){
    var password = $('#defaultRegisterFormPassword').val();
    var passwordReview = $('#defaultRegisterFormPassword2').val();
    if(password!=passwordReview){
        isPasswordDifferentError=true;
        $('#defaultRegisterFormPassword2HelpBlock').text('Password diferent');
        $('#defaultRegisterFormPassword2').removeClass('mb-4'); 
    }else{
        isPasswordDifferentError=false;
        $('#defaultRegisterFormPassword2HelpBlock').text('');
        $('#defaultRegisterFormPassword2').addClass('mb-4'); 
    }
    
}

function createAccountVerifyEmail(){
    var data = getDataFromFormRegister();
    if(isEmailError || isPasswordError || isPasswordDifferentError){
        return;
    }
    if(data){
        $('#defaultRegisterFormButtonHelpBlock').text('');
        $.ajax({
            url:'http://localhost:3000/user',
            type: "get",
            data: {email: data.email} ,
            dataType:'json',
            success: function (result) {
                if(result.length==0){
                    createAccountRegister(data);
                }else{
                    $('#defaultRegisterFormEmailHelpBlock').text('Email is already registered');
                    $('#defaultRegisterFormEmail').removeClass('mb-4');
                }
            },
            error: function (errorMessage) {
                alert(errorMessage);
            }
        });
    }else{
        $('#defaultRegisterFormButtonHelpBlock').text('Can not contain empty fields');
        $('#buttonSubmit').removeClass('my-4');
    }
}

function createAccountRegister(data){
    $.ajax({
        url:'http://localhost:3000/user',
        type: "POST",
        data: data,
        dataType:'json',
        success: function (res) {
            console.log(res);
            var date = new Date();
            document.cookie="email = "+res[0].email +" ; expires="+ date.getDate()+1+";";
            document.location.href = 'profile.html'; 
        },
        error: function (errorMessage) {
            alert(errorMessage);
        }
    });
}
