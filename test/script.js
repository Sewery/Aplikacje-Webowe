const myImage = document.querySelector("img");
prompt("xxxxx");
myImage.onclick = () => {
  const mySrc = myImage.getAttribute("src");
  if (mySrc === "./The_Great_main_pic.jpg") {
    myImage.setAttribute("src", "./The_Great_title_card.png");
  }
};
