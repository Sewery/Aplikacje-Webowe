const columns = document.getElementsByClassName("stripe-decorative");
const classesList = [
  "fa-solid fa-crown",
  "fa-solid fa-heart",
  "fa-solid fa-droplet",
];
const itemsHeights = [
  document.getElementById("icon_1").offsetHeight,
  document.getElementById("icon_2").offsetHeight,
  document.getElementById("icon_3").offsetHeight,
];

appendMaximalIcons();

function appendMaximalIcons() {
  Array.from(columns).forEach((column) => {
    let i = 0;
    let currItemsHeight = itemsHeights.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    let icon = document.createElement("i");
    icon.className = classesList[i];
    while (column.offsetHeight >= currItemsHeight + itemsHeights[i]) {
      currItemsHeight += itemsHeights[i];
      column.appendChild(icon);
      i += 1;
      i %= 3;
      icon = document.createElement("i");
      icon.className = classesList[i];
    }
  });
}
