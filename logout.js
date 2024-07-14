const handleLogOut = () => {
    const token = localStorage.getItem("token");
  
    fetch("https://rosarium-server.onrender.com/customer/logout", {
      mode: 'no-cors',
    }, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
      });
  };
  