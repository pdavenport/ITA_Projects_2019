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