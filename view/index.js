const addEmployee = () => {
  fetch(`http://localhost:3000/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: document.getElementById("name").value,
      designation: document.getElementById("designation").value,
    }),
  })
    .then((response) => response.json)
    .then((data) => {
      alert(`Employee Added to Rain DB`);
    });
};
