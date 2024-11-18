let table = document.getElementById("table_body");
const searcherButton = document.getElementById("button_searcher");
const inputSearch = document.getElementById("content_search");
const order = document.getElementById("select_order");
searcherButton.onclick = searchInTable;
getData();
async function orderSelect() {
  deleteAllRows();
  await getData();
  if (order.value === "ascending") {
    orderInTableAscending();
  } else if (order.value === "descending") {
    orderInTableDescending();
  }
}
async function getData() {
  const url = "https://dummyjson.com/products";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    processJson(json);
  } catch (error) {
    console.error(error.message);
  }
}
function processJson(obj) {
  for (let index = 0; index < 30; index++) {
    let tr = document.createElement("tr");

    let imgTD = document.createElement("td");
    let img = document.createElement("img");
    img.src = obj.products[index].images[0];
    img.width = 100;
    img.height = 100;
    imgTD.appendChild(img);

    let titleTD = document.createElement("td");
    let title = document.createTextNode(obj.products[index].title);
    titleTD.appendChild(title);

    let descriptionTD = document.createElement("td");
    let description = document.createTextNode(obj.products[index].description);
    descriptionTD.appendChild(description);

    tr.appendChild(imgTD);
    tr.appendChild(titleTD);
    tr.appendChild(descriptionTD);
    table.appendChild(tr);
  }
}
async function searchInTable() {
  await orderSelect();
  str = inputSearch.value;
  if (str.length >= 3) {
    Array.from(table.rows).forEach((row) => {
      Array.from(row.cells).forEach((cell) => {
        if (!cell.textContent.toLowerCase().includes(str.toLowerCase())) {
          row.style.display = "none";
        } else {
          row.style.display = "table-row";
        }
      });
    });
  } else {
    Array.from(table.rows).forEach((row) => {
      row.style.display = "table-row";
    });
  }
}
function deleteAllRows() {
  while (table.hasChildNodes()) {
    table.removeChild(table.firstChild);
  }
}
function orderInTableAscending() {
  let arr = Array.from(table.rows);
  deleteAllRows();
  arr
    .sort((a, b) => {
      const titleA = a.cells[1].textContent.toLowerCase();
      const titleB = b.cells[1].textContent.toLowerCase();
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    })
    .forEach((row) => {
      table.appendChild(row);
    });
}
function orderInTableDescending() {
  let arr = Array.from(table.rows);
  deleteAllRows();
  arr
    .sort((a, b) => {
      const titleA = a.cells[1].textContent.toLowerCase();
      const titleB = b.cells[1].textContent.toLowerCase();
      if (titleA > titleB) {
        return -1;
      }
      if (titleA < titleB) {
        return 1;
      }
      return 0;
    })
    .forEach((row) => {
      table.appendChild(row);
    });
}
