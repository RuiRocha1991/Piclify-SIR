function addCard(data){
    $('#container').append(`<div class="card shadow-sm m-3 col-xl-3 col-lg-4 col-md-5 col-sm-11"> <!--Start Card-->
                        <div class="card-header bg-white">
                            <div class="media m-0">
                                <div class="d-flex mr-1">
                                    <a href=""><img class="img-fluid rounded-circle" src="http://www.themashabrand.com/templates/bootsnipp/post/assets/img/users/4.jpg" alt="User"></a>
                                </div>
                                <div class="media-body">
                                    <small class="">Benjamin Robinson</small>
                                    <small class="mt-1 float-right"><i class="icon ion-md-time"></i><span>10 hours ago</span></small>
                                </div>
                            </div><!--/ media -->
                           <div class="border-bottom pb-1 mb-0">
                                <h5 class="text-center mb-0">Title of image</h5>
                           </div>
                        </div>
                        <div class="card-body p-0">
                            <img class="img-fluid m-0" src="http://www.themashabrand.com/templates/bootsnipp/post/assets/img/1.jpg" alt="Image">
                        </div>
                        <div class="card-footer bg-white m-0 p-0">
                            <div>
                                <label class="h6 mt-1">Desciption: <br>
                                    <p class="font-weight-normal m-0 border-bottom mt-1 pb-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </label>
                            </div>
                            <ul class="list-inline m-0">
                                <li class="list-inline-item mt-2"><a><i class="fa fa-thumbs-up"></i><span> 242 Likes</span></a></li>
                                <li class="list-inline-item mt-2"><a><i class="fa fa-comments"></i><span> 12</span></a></li>
                            </ul>
                        </div>
                        <hr class="my-1 mt-2">
                        <div class="input-group mt-2 mb-3">
                            <input type="text" class="form-control" placeholder="Write a comment" aria-label="Recipient's username" aria-describedby="button-addon2">
                            <div class="input-group-append">
                                <button class="btn btn-outline-success" type="button" id="button-addon2"><i class="fa fa-share-square"></i></button>
                            </div>
                        </div>
                    </div>`);
}