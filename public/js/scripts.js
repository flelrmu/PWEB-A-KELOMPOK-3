// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation1");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active1");
  main.classList.toggle("active1");
<<<<<<< HEAD
};
=======
};
>>>>>>> 62678e862dc85f27b94148cf45a9c3d0deda0b51
