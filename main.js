let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let deleteAllButton = document.getElementById("deleteAll"); // Added deleteAll button
let mood ="create";
let test; 

// get total 

function getTotal(){
  if(price.value!=0){
    let result=(+price.value + +taxes.value + +ads.value ) - +discount.value;
    total.innerHTML=result;
    total.style.backgroundColor="#040"
  }else{
    total.innerHTML='';
    total.style.backgroundColor="#a00d02"
  }
}

// Initialize dataProduct

let dataProduct;
if (localStorage.product) {
  dataProduct = JSON.parse(localStorage.product);
}else{
  dataProduct=[];
}

// create product

submit.onclick = function () {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  
  // clean Data
  
  if(title.value!=''
  &&price.value!=''
  &&category!=''
  &&newProduct.count<=100){
  if(mood==='create'){
    if(newProduct.count>1){
      for (let i = 0; i < newProduct.count; i++) {
        dataProduct.push(newProduct);
      }
    }else{
    dataProduct.push(newProduct);
}
}else{
  dataProduct[test]=newProduct;
  mood="create";
  submit.innerHTML="Create";
  count.style.display="block";
}
}
  clearData();
  localStorage.setItem('product', JSON.stringify(dataProduct));
  showData();
};

// clear data

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// show data

function showData() {
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    table += `
      <tr>
        <td id="Id">${i + 1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button id="update" onclick="updateProduct(${i})">update</button></td>
        <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
      </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  if (dataProduct.length > 0) {
    deleteAllButton.innerHTML = `<button onclick="deleteAll()">Delete All (${dataProduct.length})</button>`;
  } else {
    deleteAllButton.innerHTML = '';
  }
  getTotal();
}

// delete product

function deleteProduct(index) {
  dataProduct.splice(index, 1);
  localStorage.product = JSON.stringify(dataProduct);
  showData();
}

// delete all products

function deleteAll() {
  localStorage.removeItem("product");
  dataProduct = [];
  showData();
}
showData();

// update product data

function updateProduct(i){
  title.value=dataProduct[i].title;
  price.value=dataProduct[i].price;
  taxes.value=dataProduct[i].taxes;
  ads.value=dataProduct[i].ads;
  discount.value=dataProduct[i].discount;
  category.value=dataProduct[i].category;
  total.innerHTML=dataProduct[i].total;
  getTotal();
  count.style.display="none";
  mood="update";
  submit.innerHTML="Update";
  test=i;
  scroll({
    top:0,
    behavior:"smooth",
  })
}

// search

let searchMood="Title";
function getSearchMood(id){
  let search = document.getElementById("search");
  if(id=="SearchTitle"){
    searchMood="Title";
  }else{
    searchMood="Category";
  }
  search.placeholder='Saerch By ' + searchMood;
  search.focus();
  search.value='';
  showData();
}

function searchData(value){
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
  if(searchMood=="Title"){
      if(dataProduct[i].title.includes(value.toLowerCase())){
      table += `
        <tr>
          <td id="Id">${i + 1}</td>
          <td>${dataProduct[i].title}</td>
          <td>${dataProduct[i].price}</td>
          <td>${dataProduct[i].taxes}</td>
          <td>${dataProduct[i].ads}</td>
          <td>${dataProduct[i].discount}</td>
          <td>${dataProduct[i].total}</td>
          <td>${dataProduct[i].category}</td>
          <td><button id="update" onclick="updateProduct(${i})">update</button></td>
          <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
        </tr>
      `;
    }
  }else{
      if(dataProduct[i].category.includes(value.toLowerCase())){
      table += `
        <tr>
          <td id="Id">${i + 1}</td>
          <td>${dataProduct[i].title}</td>
          <td>${dataProduct[i].price}</td>
          <td>${dataProduct[i].taxes}</td>
          <td>${dataProduct[i].ads}</td>
          <td>${dataProduct[i].discount}</td>
          <td>${dataProduct[i].total}</td>
          <td>${dataProduct[i].category}</td>
          <td><button id="update" onclick="updateProduct(${i})">update</button></td>
          <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
        </tr>
      `;
    }
  }
  }
  document.getElementById("tbody").innerHTML = table;
}