loadOrders = () => {
    const customer_id = localStorage.getItem("customer_id");
    fetch(`https://rosarium-server.onrender.com/orders/?=${customer_id}`)
    .then(res => res.json())
    .then(data => {
        data.forEach((item) => {
            const parent = document.getElementById("table-body");
            const tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.address}</td>
            <td>${item.category}</td>
            <td>${item.order_status}</td>
            <td>${item.price}</td>
            ${
                item.order_status == "Pending" ? `<td class="text-danger">X</td>` : <td>X</td>
            }
            `;
            parent.appendChild(tr);
        });
    });
};

loadOrders();