const loadUserDetails = () => {
    const user_id = localStorage.getItem('user_id')
    fetch(`https://rosarium-server.onrender.com/all_products/list/${user_id}`, {
      mode: 'no-cors',
    })
    .then(res => res.json())
    .then(data => {
        const parent = document.getElementById("user-details-container");
      const div = document.createElement("user-all");
      div.classList.add("user-all");
      div.innerHTML = `
          <div class="user-img">
          <img src="./Images/man-1.jpg" alt="" />
        </div>
        <div class="user-info">
          <h1>${data.username}</h1>
          <h3>${data.email}</h3>
        </div>
          `;
      parent.appendChild(div);
    });

};

loadUserDetails();
