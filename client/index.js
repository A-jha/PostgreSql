let namePram = "";
let url = `http://localhost:5000/users/?name=${namePram}`;
const button = document.getElementById("button");
const cardContainer = document.getElementById("card-container");
const what = document.getElementById("what");

//modal
const modal = document.querySelector(".modal-overlay");
const closeBtn = document.querySelector(".close-btn");

const getData = async (url) => {
  const xxx = await fetch(url);
  const res = await xxx.json();
  return res;
};

let data1 = [];

button.addEventListener("click", async (e) => {
  e.preventDefault();
  namePram = document.getElementById("myInput").value;
  url = `http://localhost:5000/users/?name=${namePram}`;
  data1 = await getData(url)
    .then((data) => data.rows)
    .catch((err) => console.log(err.message));

  //set data
  const finalData = data1.map((data) => {
    return `
     <div class="card">
          <h2>Name :<span class="name"> ${data.first_name} ${data.last_name}</span></h2>
          <p>User Id :<span class="id">${data.user_id}</span></p>
          <p>Country  Code: <span class="country">${data.country}</span></p>
     </div>
     `;
  });

  cardContainer.innerHTML = finalData;
});

what.addEventListener("click", () => {
  modal.classList.add("open-modal");
});
modal.addEventListener("click", () => {
  modal.classList.remove("open-modal");
});
