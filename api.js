// initialization construct
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const animation = document.getElementById("animation");
const productsDisplay = document.getElementById("products-display");
const productDetailsContainer = document.getElementById("product-details-container");

let allPhones = [];
searchBtn.addEventListener("click", (e) => {
  try {
    displayPhones(searchInput.value.toLowerCase());
    clearSearchInput();
  } catch (error) {
    console.log(error);
  }
});
