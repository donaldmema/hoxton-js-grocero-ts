import "./style.css";
import "./reset.css";

type ProductItem = {
  id: number;
  name: string;
  price: number;
  inCart: number;
};

type State = {
  products: ProductItem[];
};

let state: State = {
  products: [
    { id: 1, name: "beetroot", price: 0.35, inCart: 0 },
    { id: 2, name: "carrot", price: 0.25, inCart: 0 },
    { id: 3, name: "apple", price: 0.3, inCart: 0 },
    { id: 4, name: "apricot", price: 0.15, inCart: 0 },
    { id: 5, name: "avocado", price: 1.25, inCart: 0 },
    { id: 6, name: "bananas", price: 0.2, inCart: 0 },
    { id: 7, name: "bell-pepper", price: 1.15, inCart: 0 },
    { id: 8, name: "berry", price: 0.1, inCart: 0 },
    { id: 9, name: "blueberry", price: 0.15, inCart: 0 },
    { id: 10, name: "eggplant", price: 2.1, inCart: 0 },
  ],
};

function getImgSrc(product: ProductItem) {
  let imgId = String(product.id).padStart(3, "0");
  let imgName = product.name + ".svg";
  return "./assets/icons/" + imgId + "-" + imgName;
}

function getTotal() {
  let cartProducts = getCartProducts();

  let total = 0;

  for (let product of cartProducts) {
    total += product.price * product.inCart;
  }

  return total.toFixed(2);
}

function getCartProducts() {
  let cartProducts = state.products.filter((product) => product.inCart > 0);
  return cartProducts;
}

function increaseQuantity(product: ProductItem) {
  product.inCart++;
}
function decreaseQuantity(product: ProductItem) {
  product.inCart--;
}

function renderStoreProducts() {
  let storeProductsList = document.querySelector(".item-list.store--item-list");
  storeProductsList.textContent = "";

  for (let product of state.products) {
    let productItem = document.createElement("li");

    let productImgDiv = document.createElement("div");
    productImgDiv.className = "store--item-icon";

    let productImg = document.createElement("img");
    productImg.src = getImgSrc(product);
    productImg.alt = product.name;

    let addToCartBtn = document.createElement("button");
    addToCartBtn.textContent = "Add to cart";
    addToCartBtn.addEventListener("click", () => {
      increaseQuantity(product);
      render();
    });

    productImgDiv.appendChild(productImg);
    productItem.append(productImgDiv, addToCartBtn);
    storeProductsList.append(productItem);
  }
}

function renderCart() {
  let cartList = document.querySelector(".item-list.cart--item-list");
  cartList.textContent = "";

  for (let product of getCartProducts()) {
    let cartItem = document.createElement("li");

    let cartProductImg = document.createElement("img");
    cartProductImg.className = "cart--item-icon";
    cartProductImg.src = getImgSrc(product);
    cartProductImg.alt = product.name;

    let productName = document.createElement("p");
    productName.textContent = product.name;

    let decreaseQuantityBtn = document.createElement("button");
    decreaseQuantityBtn.className = "quantity-btn.remove-btn.center";
    decreaseQuantityBtn.textContent = "-";
    decreaseQuantityBtn.addEventListener("click", () => {
      decreaseQuantity(product);
      render();
    });

    let productQuantity = document.createElement("span");
    productQuantity.className = "quantity-text.center";
    productQuantity.textContent = String(product.inCart);

    let increaseQuantityBtn = document.createElement("button");
    increaseQuantityBtn.className = "quantity-btn.add-btn.center";
    increaseQuantityBtn.textContent = "+";
    increaseQuantityBtn.addEventListener("click", () => {
      increaseQuantity(product);
      render();
    });

    cartItem.append(
      cartProductImg,
      productName,
      decreaseQuantityBtn,
      productQuantity,
      increaseQuantityBtn
    );
    cartList.append(cartItem);
  }
}

function renderTotal() {
  let totalAmount = document.querySelector(".total-number");
  totalAmount.textContent = getTotal();
}

function render() {
  renderStoreProducts();
  renderCart();
  renderTotal();
}

render();
