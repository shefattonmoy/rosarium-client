const loadServices = () => {
  fetch("https://rosarium-server.onrender.com/featured_products/")
    .then((res) => res.json())
    .then((data) => displayService(data));
};

const displayService = (services) => {
  services.forEach((service) => {
    const parent = document.getElementById("service-container");
    const li = document.createElement("li");
    li.classList.add("slide-visible");
    li.innerHTML = `
    <div class="card shadow h-100">
                <div class="ratio ratio-4x3">
                  <img
                    src=${service.image}
                    class="card-img"
                    loading="lazy"
                    alt="..."
                  />
                </div>
                <div class="card-body p-3 p-xl-5">
                  <h3 class="card-title h5">${service.name}</h3>
                  <p class="card-text">
                    ${service.description}
                  </p>
                  <a href="#" class="btn btn-primary">Details</a>
                </div>
              </div>
    `;
    parent.appendChild(li);
  });
};

const loadAllProducts = (search) => {
  document.getElementById("all-products").innerHTML = "";
  document.getElementById("spinner").style.display = "block";
  console.log(search);
  fetch(`https://rosarium-server.onrender.com/all_products/list/?search=${search ? search : ""}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      displayAllProducts(data?.results);
    })
    .catch((error) => {
      console.error('Error fetching products:', error);
      if (data.results.length > 0) {
        document.getElementById("spinner").style.display = "none";
        document.getElementById("nodata").style.display = "none";
        displayAllProducts(data?.results);
      } else {
        document.getElementById("all-products").innerHTML = "";
        document.getElementById("spinner").style.display = "none";
        document.getElementById("nodata").style.display = "block";
      }
    });
};

const displayAllProducts = (allProducts) => {
  const parent = document.getElementById("all-products");
  parent.innerHTML = '';

  if (!allProducts || allProducts.length === 0) {
    console.log('No products found');
    return;
  }

  allProducts.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("col-md-4", "mb-4");
    div.innerHTML = `
      <div class="card shadow h-100">
        <div class="ratio ratio-4x3">
          <img
            src="${product.image}"
            class="card-img"
            loading="lazy"
          />
        </div>
        <div class="card-body p-3 p-xl-4 mb-3 pb-1">
          <h3 class="card-title fs-3 h5 py-2" style="color: #04444E">${product.user}</h3>
          <p class="card-text pb-1 fw-semibold">Category: 
            ${product.category}
          </p>
          <p class="card-text pb-1 fw-semibold">Color: 
            ${product.color}
          </p>
          <p class="card-text fw-semibold"> Price: $${product.price}
          </p>
          <a href="#" class="btn btn-primary">Buy Now</a>
        </div>
      </div>
    `;
    parent.appendChild(div);
  });
};

const loadCategories = () => {
  fetch("https://rosarium-server.onrender.com/all_products/category/")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((category) => {
      const parent = document.getElementById("category-filter");
      const option = document.createElement("option");
      option.classList.add("category-filter-element");
      option.innerText = category?.name;
      parent.appendChild(option);
    })
  });
};

const loadColors = () => {
  fetch("https://rosarium-server.onrender.com/all_products/color/")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((color) => {
      const parent = document.getElementById("color-filter");
      const option = document.createElement("option");
      option.classList.add("color-filter-element");
      option.innerHTML = `
      <option onclick="loadAllProducts('${color.name})">${color.name}</option>
      `
      parent.appendChild(option);
    })
  });
};

const handleSearch = () => {
  const value = document.getElementById("search").value;
  loadAllProducts(value);
  console.log("Searched value", value);
}


loadServices();
loadAllProducts();
loadCategories();
loadColors();