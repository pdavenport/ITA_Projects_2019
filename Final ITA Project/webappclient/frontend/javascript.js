// Slideshow script //
var slideIndex = 0;


function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 3000); // Change image every 2 seconds
}

showSlides();
// end slideshow script //

// GET REQUEST //
function performGetRequest1() {
  var resultElement = document.getElementById('getResult1');
  resultElement.innerHTML = '';
  
  axios.get('http://localhost:8080/products')
    .then(function (response) {
      resultElement.innerHTML = generateSuccessHTMLOutput(response);
    })
    .catch(function (error) {
      resultElement.innerHTML = generateErrorHTMLOutput(error);
    });   
}
function generateSuccessHTMLOutput(response) {
  var respdata = response.data
  var outputHTML = ''
  for(i=0; i < respdata.length; i++){
    outputHTML += '<div class="imgbox img--margins ' + respdata[i].category + 
                  '"><img class="imgfeat" src="' + respdata[i].image + '"><br>' +
                  respdata[i].description + '<br>$' + respdata[i].price +
                  '<div class="imgtrans txtcenter">' +
                  '<a class="reglink" href="product_detail.html">' + respdata[i].prod_name + '</a> </div> </div> </div>';
  }
  return  outputHTML
}
function generateErrorHTMLOutput(error) {
  return  '<h4>Result</h4>' + 
          '<h5>Message:</h5> ' + 
          '<pre>' + error.message + '</pre>' +
          '<h5>Status:</h5> ' + 
          '<pre>' + error.response.status + ' ' + error.response.statusText + '</pre>' +
          '<h5>Headers:</h5>' + 
          '<pre>' + JSON.stringify(error.response.headers, null, '\t') + '</pre>' + 
          '<h5>Data:</h5>' + 
          '<pre>' + JSON.stringify(error.response.data, null, '\t') + '</pre>'; 
}

// POST REQUEST //

function performPostRequest(e) {
  var resultElement = document.getElementById('postResult');
  var firstNameValue = document.getElementById('firstName').value;
  var emailValue = document.getElementById('email').value;
  var phoneValue = document.getElementById('phone').value;
  var passValue = document.getElementById('password').value;

  resultElement.innerHTML = '';
  
  axios.post('http://localhost:8080/users', {
    FirstName: firstNameValue,
    Email: emailValue,
    Phone: phoneValue,
    Password: passValue
  })
  .then(function (response) {
    resultElement.innerHTML = generateSuccessHTMLOutput(response);
  })
  .catch(function (error) {
    resultElement.innerHTML = generateErrorHTMLOutput(error);
  });
  
  e.preventDefault();
}

// filter products

function prodSort(){
  var selectedcat = document.getElementById("categorySelector").value;
  var catProd = document.querySelectorAll(".Productivity")
  var catCom = document.querySelectorAll(".Communication")
  var catDev = document.querySelectorAll(".Development")
  var catHost = document.querySelectorAll(".Hosting")
  if (selectedcat == 'SelectAll'){
    console.log(selectedcat)
    performGetRequest1();
  }
  if (selectedcat == 'Productivity'){
     for (i = 0; i < catProd.length; i++){
      document.querySelectorAll(".Productivity")[i].style.display = "inline-block"
     }
     for (i = 0; i < catCom.length; i++){
      document.querySelectorAll(".Communication")[i].style.display = "none"
     }
     for (i = 0; i < catDev.length; i++){
      document.querySelectorAll(".Development")[i].style.display = "none"
     }
     for (i = 0; i < catHost.length; i++){
      document.querySelectorAll(".Hosting")[i].style.display = "none"
     }
  } if (selectedcat == 'Communication'){
    for (i = 0; i < catProd.length; i++){
      document.querySelectorAll(".Productivity")[i].style.display = "none"
     }
     for (i = 0; i < catCom.length; i++){
      document.querySelectorAll(".Communication")[i].style.display = "inline-block"
     }
     for (i = 0; i < catDev.length; i++){
      document.querySelectorAll(".Development")[i].style.display = "none"
     }
     for (i = 0; i < catHost.length; i++){
      document.querySelectorAll(".Hosting")[i].style.display = "none"
     }
  } if (selectedcat == 'Development'){
    for (i = 0; i < catProd.length; i++){
      document.querySelectorAll(".Productivity")[i].style.display = "none"
     }
     for (i = 0; i < catCom.length; i++){
      document.querySelectorAll(".Communication")[i].style.display = "none"
     }
     for (i = 0; i < catDev.length; i++){
      document.querySelectorAll(".Development")[i].style.display = "inline-block"
     }
     for (i = 0; i < catHost.length; i++){
      document.querySelectorAll(".Hosting")[i].style.display = "none"
     }
  } if (selectedcat == 'Hosting'){
    for (i = 0; i < catProd.length; i++){
      document.querySelectorAll(".Productivity")[i].style.display = "none"
     }
     for (i = 0; i < catCom.length; i++){
      document.querySelectorAll(".Communication")[i].style.display = "none"
     }
     for (i = 0; i < catDev.length; i++){
      document.querySelectorAll(".Development")[i].style.display = "none"
     }
     for (i = 0; i < catHost.length; i++){
      document.querySelectorAll(".Hosting")[i].style.display = "inline-block"
     }
  }
}

// for (i = 0; i < cars.length; i++) { 
//   text += cars[i] + "<br>";
// }
// querySelectorAll()