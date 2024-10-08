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
                  <a href="#" class="btn btn-primary">Learn More</a>
                </div>
              </div>
    `;
    parent.appendChild(li);
  });
};

const loadAllProducts = (search = "", category = "") => {
  document.getElementById("all-products").innerHTML = "";
  document.getElementById("spinner").style.display = "block";
  console.log(search);
  fetch(
    `https://rosarium-server.onrender.com/all_products/list/?search=${
      search ? search : ""
    }`
  )
    .then((res) => res.json())
    .then((data) => {
      displayAllProducts(data?.results);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
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
  parent.innerHTML = "";

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
          <button class="btn btn-primary" style="padding: 5px 15px; background-color: #007bff; border: none; border-radius: 4px;"><a href="allProductsDetails.html?productId=${product.id}" class="text-white" style="color: white; text-decoration: none; display: block; width: 100%; height: 100%; text-align: center;">Details</a></button>
        </div>
      </div>
    `;
    parent.appendChild(div);
  });
};

const showAllProducts = async () => {
  try {
    const response = await fetch(`http://rosarium-server.onrender.com/all_products/list`, {mode: 'no-cors',});
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const allProducts = await response.json();
    displayAllProducts(allProducts);

    const showAllButton = document.getElementById('showAllButton');
    showAllButton.style.display = 'none';
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  showAllProducts();
});

const loadCategories = () => {
  fetch("https://rosarium-server.onrender.com/all_products/category/")
    .then((res) => res.json())
    .then((data) => {
      const categorySelect = document.getElementById("category-filter");
      categorySelect.innerHTML = '<option value="">All Categories</option>';
      data.forEach((category) => {
        const option = document.createElement("option");
        option.classList.add("category-filter-element");
        option.value = category?.name;
        option.innerText = category?.name;
        categorySelect.appendChild(option);
      });
    });
};

const loadColors = () => {
  fetch("https://rosarium-server.onrender.com/all_products/color/"
  )
    .then((res) => res.json())
    .then((data) => {
      data.forEach((color) => {
        const parent = document.getElementById("color-filter");
        const option = document.createElement("option");
        option.classList.add("color-filter-element");
        option.innerHTML = `
      <option onclick="loadAllProducts('${color.name})">${color.name}</option>
      `;
        parent.appendChild(option);
      });
    });
};

const handleSearch = () => {
  const value = document.getElementById("search").value;
  const category = document.getElementById("category-filter").value;
  loadAllProducts(value, category);
  console.log("Searched value", value);
};

const handleCategoryFilter = () => {
  const category = document.getElementById("category-filter").value;
  const search = document.getElementById("search").value;
  loadAllProducts(search, category);
};

const loadReviews = () => {
  fetch("https://rosarium-server.onrender.com/all_products/reviews/")
  .then(res => res.json())
  .then(data => displayReviews(data));
}

const displayReviews = (reviews) => {
  reviews.forEach((review) => {
    const parent = document.getElementById("review-container");
    const li = document.createElement("li");
    li.classList.add("slide-visible");
    li.innerHTML = `
    <div class="card shadow h-100">
                <div class="ratio ratio-4x3">
                  <img
                    src="./images/ArronWelch.jpg"
                    class="card-img"
                    loading="lazy"
                    alt="..."
                  />
                </div>
                <div class="card-body p-3 p-xl-5">
                  <h3 class="card-title h5">${review.reviewer_name}</h3>
                  <p class="card-text">
                    ${review.body}
                  </p>
                  <p class="card-text">
                    ${review.rating}
                  </p>
                  <p class="card-text">
                    ${review.created}
                  </p>
              </div>
    `;
    parent.appendChild(li);
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const profileLink = document.getElementById('profile-link');
  const loginLink = document.getElementById('login-link');
  const logoutLink = document.getElementById('logout-link');

  function isLoggedIn() {
      return localStorage.getItem('isLoggedIn') === 'true';
  }

  function toggleLinks() {
      if (isLoggedIn()) {
          profileLink.style.display = 'block';
          logoutLink.style.display = 'block';
          loginLink.style.display = 'none';
      } else {
          profileLink.style.display = 'none';
          logoutLink.style.display = 'none';
          loginLink.style.display = 'block';
      }
  }

  toggleLinks();

  function handleLogin(event) {
      event.preventDefault();
      localStorage.setItem('isLoggedIn', 'true');
      toggleLinks();
  }

  function handleLogout(event) {
      event.preventDefault();
      localStorage.setItem('isLoggedIn', 'false');
      toggleLinks();
  }

  const loginButton = document.querySelector('.submit-btn');
  if (loginButton) {
      loginButton.addEventListener('click', handleLogin);
  }

  logoutLink.addEventListener('click', handleLogout);
});

loadServices();
loadAllProducts();
loadCategories();
loadColors();
loadReviews();