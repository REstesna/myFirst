// for all projects -->
let $ = document;

//////////////////////////////////////////////////////////////////////

const products = [
  { id: 1, Title: "Album1", price: 12.0, src: "Images/Album 1.png", count: 1 },
  { id: 2, Title: "Album2", price: 10.0, src: "Images/Album 2.png", count: 1 },
  { id: 3, Title: "Album3", price: 15.0, src: "Images/Album 3.png", count: 1 },
  { id: 4, Title: "Album4", price: 20.0, src: "Images/Album 4.png", count: 1 },
  { id: 5, Title: "Cofee", price: 11.0, src: "Images/Cofee.png", count: 1 },
  { id: 6, Title: "T-Shirt", price: 19.0, src: "Images/shirt.png", count: 1 },
];

let userBasket = [];
let finalPrice = 0;

const shopItemsContainer = $.querySelector(".shop-items");
const cartItemsContainer = $.querySelector(".cart-items");
const finalPriceElem = $.querySelector(".cart-total-price");

// generate products function

function generateProducts(productsArray) {
  productsArray.forEach(function (product) {
    // make elements
    let shopItemDiv,
      itemTitleSpan,
      itemImg,
      itemDetailDiv,
      itemPriceSpan,
      itemBtn;

    shopItemDiv = $.createElement("div");
    itemTitleSpan = $.createElement("span");
    itemImg = $.createElement("img");
    itemDetailDiv = $.createElement("div");
    itemPriceSpan = $.createElement("span");
    itemBtn = $.createElement("button");

    // set innerHtml, src and other for Elements
    itemTitleSpan.innerHTML = product.Title;
    itemImg.src = product.src;
    itemPriceSpan.innerHTML = "$" + product.price;
    itemBtn.innerHTML = "Add To Cart";

    // set class for Elements
    shopItemDiv.classList.add("shop-item");
    itemTitleSpan.classList.add("shop-item-title");
    itemImg.classList.add("shop-item-image");
    itemDetailDiv.classList.add("shop-item-details");
    itemPriceSpan.classList.add("shop-item-price");
    itemBtn.className = "btn btn-primary shop-item-button";

    // set eventlistenr
    itemBtn.setAttribute("onclick", "addToBasketHandler(" + product.id + ")");

    // append Elements
    shopItemDiv.append(itemTitleSpan, itemImg, itemDetailDiv);
    itemDetailDiv.append(itemPriceSpan, itemBtn);

    shopItemsContainer.append(shopItemDiv);

    calculateBasketPrice(userBasket);
  });
}

// add to basket function

function addToBasketHandler(productId) {
  let mainObj = getObjWithId(products, productId);

  let chekProductInBasket = userBasket.findIndex(function (i) {
    return i.id === mainObj.id;
  });

  if (chekProductInBasket === -1) {
    userBasket.push(mainObj);
    setBasketToLocalStorage(userBasket);
  }
}

// get main object with id
function getObjWithId(mainArray, id) {
  let mainObj = mainArray.find(function (item) {
    return item.id === id;
  });

  return mainObj;
}

// set basket to localStorage

function setBasketToLocalStorage(localBasket) {
  genrateBasketHandler(localBasket);
  localStorage.setItem("localBasket", JSON.stringify(localBasket));
}

// generate basket items

function genrateBasketHandler(localBasket) {
  cartItemsContainer.innerHTML = "";

  localBasket.forEach(function (product) {
    let cartRowDiv,
      cartItemDiv,
      cartItemImg,
      cartItemTitleSpan,
      cartPriceSpan,
      cartQuantityDiv,
      quantityInput,
      removeCartBtn;

    // create Elements
    cartRowDiv = $.createElement("div");
    cartItemDiv = $.createElement("div");
    cartItemImg = $.createElement("img");
    cartItemTitleSpan = $.createElement("span");
    cartPriceSpan = $.createElement("span");
    cartQuantityDiv = $.createElement("div");
    quantityInput = $.createElement("input");
    removeCartBtn = $.createElement("button");

    // set classes
    cartRowDiv.className = "cart-row";
    cartItemDiv.className = "cart-item cart-column";
    cartItemImg.className = "cart-item-image";
    cartItemTitleSpan.className = "art-item-title";
    cartPriceSpan.className = "cart-price cart-column";
    cartQuantityDiv.className = "cart-quantity cart-column";
    quantityInput.className = "cart-quantity-input";
    removeCartBtn.className = "btn btn-danger";

    // set innerHtmls
    cartItemImg.src = product.src;
    cartItemTitleSpan.innerHTML = product.Title;
    cartPriceSpan.innerHTML = "$" + product.price;
    quantityInput.value = product.count;
    quantityInput.type = "number";
    removeCartBtn.innerHTML = "REMOVE";

    // append Elements
    cartRowDiv.append(cartItemDiv, cartPriceSpan, cartQuantityDiv);
    cartItemDiv.append(cartItemImg, cartItemTitleSpan);
    cartQuantityDiv.append(quantityInput, removeCartBtn);

    console.log(cartRowDiv);

    removeCartBtn.setAttribute(
      "onclick",
      "removeFromeDomAndBasketHandler(" + product.id + ")"
    );
    quantityInput.setAttribute(
      "oninput",
      "updateProcutCount(" + product.id + ", event  )"
    );

    calculateBasketPrice(userBasket);
    cartItemsContainer.append(cartRowDiv);
  });
}

// remove from basket

function removeFromeDomAndBasketHandler(productId) {
  let mainProduct = getObjWithId(userBasket, productId);

  let mainProductIndex = userBasket.findIndex(function (obj) {
    return obj === mainProduct;
  });

  mainProduct.count = 1;

  userBasket.splice(mainProductIndex, 1);
  setBasketToLocalStorage(userBasket);

  calculateBasketPrice(userBasket);
}

// update product count in basket

function updateProcutCount(productId, e) {
  let mainProduct = getObjWithId(userBasket, productId);
  console.log(e.target.focus());

  if (e.target.value < 1) {
    e.target.value = 1;
  } else {
    mainProduct.count = e.target.value;
    setBasketToLocalStorage(userBasket);
    calculateBasketPrice(userBasket);
  }

  console.log(e);
  console.log(userBasket);
}

// price calculate and add to dom

function calculateBasketPrice(userBasket) {
  finalPrice = 0;
  userBasket.forEach(function (product) {
    finalPrice += product.price * +product.count;
  });

  finalPriceElem.innerHTML = "$" + finalPrice;
}

// is in basket  ?

// function () {

//     userBasket.find(function (item) {
//         return item ===
//     })
// }

// call function

window.onload = function () {
  let getUserBasketFromLocal = JSON.parse(localStorage.getItem("localBasket"));

  if (getUserBasketFromLocal) {
    userBasket = getUserBasketFromLocal;
    genrateBasketHandler(userBasket);
  }
  generateProducts(products);
};

