/* pineapple on pizza */
function thatsNasty() {
  var checkBox = document.getElementById("disgusting");
  var img = document.getElementById("nasty");
  if (checkBox.checked == true) {
      img.style.display = "flex";
  } else {
      img.style.display = "none";
  }
}

/* make navbar sticky again */
window.onscroll = function() {
  navbarSticky()
};

var navbar = document.getElementsByClassName("navbar");
var sticky = navbar.offsetTop;

function navbarSticky() {
  if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky")
  } else {
      navbar.classList.remove("sticky");
  }
}

/* sort names */

function submitNames() {

  var rawInput = document.getElementById("nameList").value;
  rawArray = rawInput.split(', ');

  function lastNameSort(a, b) {

      var aName = a.split(" ");
      var bName = b.split(" ");
      var aLastName = aName[aName.length - 1];
      var bLastName = bName[bName.length - 1];

      if (aLastName < bLastName) return -1;
      if (aLastName > bLastName) return 1;
      return 0;
  }

  rawArray.sort(lastNameSort);
  console.log(rawArray);
  var sortedString = rawArray.toString();
  console.log(sortedString);
  var formattedString = sortedString.replace(/ /g, ' <span class="lastName">');
  var finalString = formattedString.replace(/,/g, "</span><br>")
  console.log(finalString);
  var x = document.getElementById("sortedNamesList");
  x.innerHTML = finalString;

}