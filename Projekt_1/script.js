const dropDownMenu = document.querySelector("#dropdown-menu");
const menuLinks = document.querySelector(".menu");

dropDownMenu.addEventListener("click", function () {
  dropDownMenu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
});
