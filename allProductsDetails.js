const getParams = () => {
    const param = new URLSearchParams(window.location.search).get("productId");
    loadTime(param);
    fetch(`https://rosarium-server.onrender.com/all_products/list/${param}`),
    {
      mode: 'no-cors',
    }
    .then(res => res.json())
    .then(data => displayDetails(data));
};

const displayDetails = (product) => {
    const parent = document.getElementById("all-product-details");
    const div = document.createElement("div");
    div.classList.add("all-product-details-container");
    div.innerHTML = `
    <div class="product-img">
            <img src=${product.image} alt="">
        </div>
        <div class="product-info">
            <h1>${product.user}</h1>
            <p>Color: ${product.color}</p>
            <p>Category: ${product.category}</p>
            <h4>Price: $${product.price}</h4>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Buy Now</button>
        </div>
    `;
    parent.appendChild(div);
}

const loadTime = (id) => {
    fetch(
      `https://rosarium-server.onrender.com/all_products/receiving_time/?productId=${id}`,
      {
        mode: 'no-cors',
      }
    )
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item) => {
          const parent = document.getElementById("time");
          const option = document.createElement("option");
          option.value = item.id;
          option.innerText = item.name;
          parent.appendChild(option);
        });
      });
  };

const handleOrder = () => {
    const param = new URLSearchParams(window.location.search).get("productId");
    const delivery = document.getElementsByName("delivery");
    const selected = Array.from(delivery).find((button) => button.checked);
    const address = document.getElementById("address").value;
    const time = document.getElementById("time");
    const selectedTime = time.options[time.selectedIndex];
    const customer_id = localStorage.getItem("customer_id");

    if (!selected || !selectedTime) {
        console.error("Delivery option or time not selected");
        return;
    }
    
    const info = {
        order_types: selected.value,
        order_status: "Pending",
        time: selectedTime.value,
        address: address,
        cancel: false,
        customer: customer_id,
        product: param,
      };

      fetch("https://rosarium-server.onrender.com/orders/",
        {
          mode: 'no-cors',
        }, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(info),
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
}

const loadCustomerId = () => {
  const user_id = localStorage.getItem("user_id");
  fetch(`https://rosarium-server.onrender.com/customer/list/?user_id=${user_id}`, {
    mode: 'no-cors',
  })
  .then(res => res.json())
  .then(data => {
    localStorage.setItem("customer_id", data[0].id);
  })
}

getParams();
loadTime();
loadCustomerId();