
///////////////////nav close and open///////////////////
const listsNav = document.querySelectorAll(".nav-tab li");
function openNav() {
  $(".side-nav-menu ").animate({ left: 0 }, 500);
  $(".open-nav").removeClass("fa-align-justify");
  $(".open-nav").addClass("fa-xmark");
  for (let [i, value] of listsNav.entries()) {
    $(listsNav)
      .eq(i + 1)
      .animate(
        {
          top: 0,
        },
        1000
      );
  }
  $(listsNav).eq(0).animate(
    {
      top: 0,
    },
    750
  );
}

function closNav() {
  let sideNavWidth = $(".side-nav-menu .nav-tab").outerWidth();
  $(".side-nav-menu ").animate({ left: -sideNavWidth }, 500);
  $(".open-nav").removeClass("fa-xmark");
  $(".open-nav").addClass("fa-align-justify");
  $(listsNav).animate({ top: 400 }, 400);
}

closNav();

$(".links li a").click(closNav);

$(".open-nav").click(() => {
  if ($(".side-nav-menu ").css("left") == "0px") {
    closNav();
  } else {
    openNav();
  }
});



////////////////////document ready - top page -scroll contact//////////////////

$(document).ready(()=> {
 
 getMovie('movie/now_playing').then(()=>{

  
  $(".load").fadeOut(1500);
  
  
})
});

function topPage() {
  $("html, body").animate({ scrollTop: 0 }, 1500);

}

function scroll()
{
  

    $(window).scroll(toTop);
    function toTop()
    {
        if (window.pageYOffset > 100) {
            $('#toTop').removeClass("d-none  animate__fadeOut");
            $('#toTop').addClass("animate__fadeIn");
            } else {
            $('#toTop').addClass(" d-none animate__fadeOut"); 
            $('#toTop').removeClass("animate__fadeIn");  
        }
    }
}


scroll()

$("#contactUs").click(function (e) {
  let clickedSec = $(e.target).attr("href");

  let secPos = $(clickedSec).offset().top;

  $("html, body").animate({ scrollTop: secPos }, 1500);
});



//////////////////////////////get movies/////////////////////////////////////////

async function getMovie(status) {
  const response = await fetch(
    `https://api.themoviedb.org/3/${status}?api_key=2175a874749b78f5497efac40ac896d8&language=en-US&include_adult=false`
  );
  const data = await response.json();
  const results = data.results;
  displayMovies(results);
}



async function search(movieName) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=2175a874749b78f5497efac40ac896d8&language=en-US&include_adult=false`
  );
  const data = await response.json();
  const results = data.results;
  displayMovies(results);
}

$('#search').on("input", function(e) {
  search(e.target.value);
  if(e.target.value == "")
  {
      getMovie("movie/now_playing");
  }
});

function displayMovies(arrays) {
  let cartona = "";

  for (let [i, array] of arrays.entries()) {

    const imgPath = "https://image.tmdb.org/t/p/w500";
    const posterPath = array.poster_path;
    const backDropPath = array.backdrop_path;
    const defaultImage = "images/default-movie.jpg";

    cartona += `  <div class="col-lg-4 col-md-6 col-sm-12 animate__fadeInUp animate__animated">
        <div class="item${i+1} item overflow-hidden position-relative">
            <div class="cardImage${i+1} cardImage">
                <img src='${
                  posterPath != null
                    ? imgPath + posterPath
                    : backDropPath != null
                    ? imgPath + backDropPath
                    : defaultImage
                }' class="img-fluid">
            </div>
            <div class="overlay${i+1} overlay overflow-hidden">
                <h1 class="animate__animated title title${i+1}">${
                  array.title != null ? array.title : array.name
                }</h1>    
                <p class="animate__animated desc desc${i+1}">${array.overview
                  ?.split("")
                  .slice(0, 200)
                  .join("")}</p>
                <p class="animate__animated date date${i+1}"><span class="fst-normal">Release Date<span> : ${
                  array.release_date ? array.release_date: array.first_air_date
                }</p>
                <h3 class="rate${i+1} rate animate__animated">${vote(
                  array.vote_average.toFixed(1)
                )}</h3>
                <h3 class="rate animate__animated vote vote${i+1}">${array.vote_average.toFixed(
                  1
                )}</h3>
            </div>
        </div>
    </div>
   `;

  
   $(`#movie .item${i+1}`).mouseleave( ()=>{
    cardHoverOut(i+1)
   });
  }
 
  document.getElementById("moviesHtml").innerHTML = cartona;
  for (let i = 0; i < arrays.length; i++) {
    $(`#movie .item${i+1}`).mouseenter(()=>{
  
      animateEnter(i+1)
        
       });
       $(`#movie .item${i+1}`).mouseleave( ()=>{
        animateLeave(i+1)
       });
      }
    
  }




function vote(y) {
  muteStar = `<i class="fa-solid fa-star text-muted fs-6 ps-1"></i>`;
  halfStar = `<i class="fa-regular fa-star-half-stroke text-warning fs-6 ps-1"></i>`;
  fullStar = ` <i class="fa-solid fa-star text-warning fs-6"></i>`;

  let x;
  if (y < 1) {
    x = muteStar + muteStar + muteStar + muteStar + muteStar;
  } else if (y < 2) {
    x = halfStar + muteStar + muteStar + muteStar + muteStar;
  } else if (y < 3) {
    x = fullStar + muteStar + muteStar + muteStar + muteStar;
  } else if (y < 4) {
    x = fullStar + halfStar + muteStar + muteStar + muteStar;
  } else if (y < 5) {
    x = fullStar + fullStar + muteStar + muteStar + muteStar;
  } else if (y < 6) {
    x = fullStar + fullStar + halfStar + muteStar + muteStar;
  } else if (y < 7) {
    x = fullStar + fullStar + fullStar + muteStar + muteStar;
  } else if (y < 8) {
    x = fullStar + fullStar + fullStar + halfStar + muteStar;
  } else if (y < 9) {
    x = fullStar + fullStar + fullStar + fullStar + muteStar;
  } else if (y < 10) {
    x = fullStar + fullStar + fullStar + fullStar + halfStar;
  } else if ((y = 10)) {
    x = fullStar + fullStar + fullStar + fullStar + fullStar;
  }

  return x;
}

////////////////////////////////card animate/////////////////

function animateEnter(index)
    {
    $(`.overlay${index}`).css({"opacity":"1","visibility":"visible"});
     $(`.overlay${index} .title${index}`).removeClass('animate__slideOutLeft');
      $(`.overlay${index} .title${index}`).addClass('animate__fadeInDown animate__delay-0s');
      $(`.overlay${index} .desc${index}`).removeClass('animate__slideOutLeft');
     $(`.overlay${index} .desc${index}`).addClass('animate__flipInX animate__delay-0s');
  $(`.overlay${index} .date${index}`).removeClass('animate__slideOutLeft');
     $(`.overlay${index} .date${index}`).addClass('animate__fadeInUp animate__delay-0s');
   $(`.overlay${index} .rate${index}`).removeClass('animate__slideOutLeft');
     $(`.overlay${index} .rate${index}`).addClass('animate__fadeInUp animate__delay-0s');
     $(`.cardImage${index} img`).addClass("animate");
  }
  function animateLeave(index)
    {
      $(`.overlay${index}`).css({"opacity":"0","visibility":"hidden"});
      $(`.overlay${index} .title${index}`).removeClass('animate__fadeInDown animate__delay-0s');
      $(`.overlay${index} .title${index}`).addClass('animate__slideOutLeft');
      $(`.overlay${index} .desc${index}`).removeClass('animate__flipInX animate__delay-0s');
      $(`.overlay${index} .desc${index}`).addClass('animate__slideOutLeft');
      $(`.overlay${index} .date${index}`).removeClass('animate__fadeInUp animate__delay-0s');
      $(`.overlay${index} .date${index}`).addClass('animate__slideOutLeft');
      $(`.overlay${index} .rate${index}`).removeClass('animate__fadeInUp animate__delay-0s');
      $(`.overlay${index} .rate${index}`).addClass('animate__slideOutLeft');
      $(`.cardImage${index} img`).removeClass("animate");
}  





////////////////////////////////////validition//////////////////


function validName() {
  let nameInput = document.getElementById("name");
  let regex = /^[a-zA-z\s]{1,36}$/;
  if (nameInput.value == "") {
    trueRegex();
  } else if (regex.test(nameInput.value) == true) {
    trueRegex();
  } else {
    falseRegex();
  }

  function trueRegex() {
    $("#name").removeClass("border-danger");
    $(".errorName").removeClass("text-danger d-block animate__flipInX");
    $(".errorName").addClass("d-none animate__fadeOutUp");
    $(".form-btn").removeClass("animate__shakeX bg-danger");
  }
  function falseRegex() {
    $("#name").addClass("border-danger");
    $(".errorName").addClass("text-danger d-block animate__flipInX");
    $(".errorName").removeClass("d-none animate__fadeOutUp");
    $(".form-btn").addClass("animate__shakeX bg-danger");
  }

  return regex.test(nameInput.value);
}

function validEmail() {
  let regex = /^[a-zA-Z0-9]{1,30}@[a-z0-9]{1,10}\.[a-z]{3}$/;
  let emailInput = document.getElementById("email");

  if (emailInput.value == "") {
    trueRegex();
  } else if (regex.test(emailInput.value) == true) {
    trueRegex();
  } else {
    falseRegex();
  }

  function trueRegex() {
    $("#email").removeClass("border-danger");
    $(".errorEmail").removeClass("text-danger d-block animate__flipInX");
    $(".errorEmail").addClass("d-none animate__fadeOutUp");
    $(".form-btn").removeClass("animate__shakeX bg-danger");
  }
  function falseRegex() {
    $("#email").addClass("border-danger");
    $(".errorEmail").addClass("text-danger d-block animate__flipInX");
    $(".errorEmail").removeClass("d-none animate__fadeOutUp");
    $(".form-btn").addClass("animate__shakeX bg-danger");
  }

  return regex.test(emailInput.value);
}
function validPhone() {
  let regex = /^(02)?01[0-25][0-9]{8}$/;
  let phoneInput = document.getElementById("phone");

  if (phoneInput.value == "") {
    trueRegex();
  } else if (regex.test(phoneInput.value) == true) {
    trueRegex();
  } else {
    falseRegex();
  }

  function trueRegex() {
    $("#phone").removeClass("border-danger");
    $(".errorPhone").removeClass("text-danger d-block animate__flipInX");
    $(".errorPhone").addClass("d-none animate__fadeOutUp");
    $(".form-btn").removeClass("animate__shakeX bg-danger");
  }
  function falseRegex() {
    $("#phone").addClass("border-danger");
    $(".errorPhone").addClass("text-danger d-block animate__flipInX");
    $(".errorPhone").removeClass("d-none animate__fadeOutUp");
    $(".form-btn").addClass("animate__shakeX bg-danger");
  }

  return regex.test(phoneInput.value);
}

function validAge() {
  let regex = /^(1[6-9]|[2-9][0-9]|100)$/;
  let ageInput = document.getElementById("age");

  if (ageInput.value == "") {
    trueRegex();
  } else if (regex.test(ageInput.value) == true) {
    trueRegex();
  } else {
    falseRegex();
  }

  function trueRegex() {
    $("#age").removeClass("border-danger");
    $(".errorAge").removeClass("text-danger d-block animate__flipInX");
    $(".errorAge").addClass("d-none animate__fadeOutUp");
    
    $(".form-btn").removeClass("animate__shakeX bg-danger");
  }
  function falseRegex() {
    $("#age").addClass("border-danger");
    $(".errorAge").addClass("text-danger d-block animate__flipInX");
    $(".errorAge").removeClass("d-none animate__fadeOutUp");
    $(".form-btn").addClass("animate__shakeX bg-danger");
  }

  return regex.test(ageInput.value);
}
let passInput = document.getElementById("password");
function validPass() {
  let regex = /^(?=.*\d)(?=.*[A-Za-z])[0-9a-zA-Z]{8,}$/;
 

  if (passInput.value == "") {
    trueRegex();
  } else if (regex.test(passInput.value) == true) {
    trueRegex();
  } else {
    falseRegex();
  }

  function trueRegex() {
    $("#password").removeClass("border-danger");
    $(".errorPass").removeClass("text-danger d-block animate__flipInX");
    $(".errorPass").addClass("d-none animate__fadeOutUp");
    $(".form-btn").removeClass("animate__shakeX bg-danger");
  }
  function falseRegex() {
    $("#password").addClass("border-danger");
    $(".errorPass").addClass("text-danger d-block animate__flipInX");
    $(".errorPass").removeClass("d-none animate__fadeOutUp");
    $(".form-btn").addClass("animate__shakeX bg-danger");
  }

  if (passInput.value == "") {
    $(".eyePass").addClass("d-none animate__slideOutdDown");
    $(".eyePass").addClass("d-none ");
  } else {
    $(".eyePass").removeClass("d-none ");
    $(".eyePass").addClass("animate__slideInUp ");
  }

  $(".eyePass").click(function () { 
    if ($('#password').attr('type') == "password"){
      $(".eyePass").addClass("fa-eye ");
      $(".eyePass").removeClass("fa-eye-slash ");
     
      $('#password').attr('type', "text");
     
      
    }else{
      $(".eyePass").removeClass("fa-eye ");
      $(".eyePass").addClass("fa-eye-slash ");
     
      $('#password').attr('type', "password");
      
    }
    
  });
 

 
}
function validRePass() {
  let rePassInput = document.getElementById("repassword");
  if (rePassInput.value == passInput.value) {
    trueRegex();
  }else if(rePassInput.value=="") {
    trueRegex();
  }
   else {
    falseRegex();
  }

  function trueRegex() {
    $("#repassword").removeClass("border-danger");
    $(".errorrepass").removeClass("text-danger d-block animate__flipInX");
    $(".errorrepass").addClass("d-none animate__fadeOutUp");
    $(".form-btn").removeClass("animate__shakeX bg-danger");
  }
  function falseRegex() {
    $("#repassword").addClass("border-danger");
    $(".errorrepass").addClass("text-danger d-block animate__flipInX");
    $(".errorrepass").removeClass("d-none animate__fadeOutUp");
    $(".form-btn").addClass("animate__shakeX bg-danger");
  }

  return rePassInput == passInput;
}


















///////////////////// card animate 