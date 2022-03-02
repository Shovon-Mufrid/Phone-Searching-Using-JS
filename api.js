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

//search 
async function displayPhones(phoneName) {
    clearDisplay();
    clearShowMoreBtn();
    allPhones = await getData(phoneName, true);
  
    if (allPhones.length <= 0) return nothingFound();
  
    renderCards(allPhones.slice(0, 20));
  
    if (allPhones.length > 20) renderShowMoreBtn();
  }
  function renderCards(phones) {
    clearDisplay();
    phones.forEach((phone) => {
      productsDisplay.insertAdjacentHTML(
        "beforeend",
        `<div class="col">
          <div class="card pt-3 text-center">
            <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              <h6 class="card-title">${phone.brand}</h6>
              <a href="#" onclick="displayProductDetails('${phone.slug}')" class="btn btn-primary">View details</a>
            </div>
          </div>
        </div>`
      );
    });
  }
  async function displayProductDetails(id) {
    productDetailsContainer.textContent = "";
    let phone = await getData(id, false);
    productDetailsContainer.innerHTML = `
      <div class="text-center shadow shadow-lg rounded-3 py-4">
        <h2 class="text-success">Product Details</h2>
        <img id="details-img" src="${phone.image}" class="w-75" alt="..." />
        <div class="card-body text-start ms-4">
          <h3 class="card-title">${phone.name}</h3>
          <h6 class="card-title">Brand: <span class="text-muted">${
            phone.brand
          }</span></h6>
          <h6 class="card-title">Release Date: <span class="text-muted">${
            phone.releaseDate ? phone.releaseDate : "Not found"
          }</span>
          </h6>
          <div>
          ${displayFeatures(phone.mainFeatures, "Main Features")}
          </div>
          <div>
          ${displayFeatures(phone.others, "Other Connectivity")}
          </div>
        </div>
      </div>`;
  }
  