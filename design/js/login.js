$(document).ready(function(){
    window.setTimeout(changeBackground, 1);
});

function changeBackground(){
    $('body').attr('background','https://picsum.photos/1920/1080/?random');
}

function login(){
    var date = new Date();
    document.cookie="email = ruirocha1991@gmail.com ; expires="+ date.getDate()+1+";";
    document.location.href = 'index.html';
}

function showFormLogin(){
    $('#container form').remove();
    $('#container').append('<form id="form-login" class="col-sm-12 col-md-8 col-lg-6 col-xl-6 text-center border border-black rounded bg-light pb-5"><p class="h4 m-3">Sign in</p><hr><div class="pl-5 pr-5"><input type="email" id="defaultLoginFormEmail" class="form-control mb-4" placeholder="E-mail"><input type="password" id="defaultLoginFormPassword" class="form-control mb-4" placeholder="Password"><div class="d-flex justify-content-around"><div><div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input" id="defaultLoginFormRemember"><label class="custom-control-label" for="defaultLoginFormRemember">Remember me</label></div></div><div><a href="">Forgot password?</a></div></div><button class="btn btn-info btn-block my-4" type="submit">Sign in</button></div><p>Not a member?<button class="btn btn-info" onclick="showFormRegister()">Register</button></p><p>or sign in with:</p><a type="button" class="light-blue-text mx-2"><i class="fab fa-facebook-f"></i></a><a type="button" class="light-blue-text mx-2"><i class="fab fa-twitter"></i></a><a type="button" class="light-blue-text mx-2"><i class="fab fa-linkedin-in"></i></a><a type="button" class="light-blue-text mx-2"><i class="fab fa-github"></i></a></form>');
}

function showFormRegister(){
    $('#container form').remove();  

    $('#container').append('<form id="form-register" class="col-sm-12 col-md-9 col-lg-7 col-xl-7 text-center border border-black rounded bg-light" ><p class="h4 m-3">Sign up</p><hr><div class=" pl-5 pr-5"><div id="form-name" class="form-row mb-4"><div class="col"><input type="text" id="defaultRegisterFormFirstName" class="form-control" placeholder="First name"></div><div class="col"><input type="text" id="defaultRegisterFormLastName" class="form-control" placeholder="Last name"></div></div><input type="email" id="defaultRegisterFormEmail" class="form-control mb-4" placeholder="E-mail"><input type="password" id="defaultRegisterFormPassword" class=" form-controlplaceholder="Password"aria-describedby="defaultRegisterFormPasswordHelpBlock"><small id="defaultRegisterFormPasswordHelpBlock" class="form-text text-muted mb-2">At least 8 characters and 1 digit</small><input type="password" id="defaultRegisterFormPassword2" class=" form-control mb-4" placeholder="Password"><input type="text" id="defaultRegisterLocality" class=" form-control mb-4" placeholder="Locality"><input type="text" id="defaultRegisterCountry" class=" form-control mb-4" placeholder="Country"><div class="text-left  mb-4 "><div class="btn-group btn-group-toggle"  data-toggle="buttons"><label class="btn btn-outline-info active"><input type="radio" name="options" id="option1" autocomplete="off" checked>Male</label><label class="btn btn-outline-info"><input type="radio" name="options" id="option2" autocomplete="off">Female</label></div></div><input type="date" id="defaultRegisterBirthDate" class=" form-control mb-4" placeholder="Birth Date"><button class="btn btn-info my-4 btn-block" type="submit">Sign up</button></div><p>or sign up with:</p><a type="button" class="light-blue-text mx-2"><i class="fab fa-facebook-f"></i></a><a type="button" class="light-blue-text mx-2"><i class="fab fa-twitter"></i></a><a type="button" class="light-blue-text mx-2"><i class="fab fa-linkedin-in"></i></a><a type="button" class="light-blue-text mx-2"><i class="fab fa-github"></i></a><hr><p>By clicking<em>Sign up</em> you agree to our<a href="" target="_blank">terms of service</a></p></form>')
}
