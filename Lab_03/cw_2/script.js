const elminLength = document.querySelector("#min_length");
const elmaxLength = document.querySelector("#max_length");
const eluppercaseLetters = document.querySelector(
  "#checkbox_uppercase_letters"
);
const elspecialChars = document.querySelector("#checkbox_special_chars");
const buttonGenerate = document.querySelector("#button_generator");
let elGeneretedPassword = document.getElementById("#generated_password");

buttonGenerate.onclick = function () {
  if (elminLength.validity.valid && elmaxLength.validity.valid) {
    const minNum = elminLength.value;
    const maxNum = elmaxLength.value;
    let characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const specialChars = "!@#$%^&*()_?><_+{}:\"|'\\";
    const lenPassword = Math.round(Math.random() * (maxNum - minNum)) + +minNum;
    if (eluppercaseLetters.checked) {
      characters += uppercaseLetters;
    }
    if (elspecialChars.checked) {
      characters += specialChars;
    }
    let output = "";
    for (let index = 0; index < lenPassword; index++) {
      output += characters.charAt(
        Math.round(Math.random() * characters.length)
      );
    }
    alert(output);
    elGeneretedPassword.innerText = output;
  }
};
