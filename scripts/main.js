// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
const baseServerURL = `http://localhost:${
  import.meta.env.REACT_APP_JSON_SERVER_PORT
}`;
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------

// ** Constants / Variables ** //
const pitchURL = `${baseServerURL}/pitches`;
let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

let pitchData = [];
getPitches();
function getPitches() {
  fetch(`${pitchURL}`)
    .then((res) => {
      return res.json();
    })
    .then((pitch) => {
      
      displayData(pitch);
      return pitch;
    })
    .catch((err) => {
      console.log(err);
    });
}

function displayData(data) {
  mainSection.innerHTML = null;
  let cardlist = document.createElement("div");
  cardlist.setAttribute("class", "card-list");
  let renderData = data.map((el, i) => {
    return `    <div class="card" data-id=${el.id}>
        <div class="card-img">
            <img src=${el.image} alt="pitch">
        </div>
        <div class="card-body">
            <h4 class="title">${el.title}</h4>
            <p class="card-founder">${el.founder}</p>
            <p class="card-category">${el.category}</p>
            <p class="card-price">${el.price}</p>
            <a href="#" data-id=${el.id} class="card-link">Edit</a>
            <button data-id=${el.id} class="card-button">Delete</button>
        </div>
    </div>`;
  });
  cardlist.innerHTML = renderData.join("");
  mainSection.append(cardlist);

  let editBtn = document.querySelectorAll(".card-link");
  editBtn.forEach((el) => {
    el.addEventListener("click", () => {
      let id = el.dataset.id;
      fetch(`${pitchURL}/${id}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          updatePitchIdInput.value = data.id;
          updatePitchTitleInput.value = data.title;
          updatePitchImageInput.value = data.image;
          updatePitchfounderInput.value = data.founder;
          updatePitchCategoryInput.value = data.category;
          updatePitchPriceInput.value = data.price;

          updatePricePitchId.value = data.id;
          updatePricePitchPrice.value=data.price;
        });
    });
  });

  updatePitchBtn.addEventListener("click", () => {
    let idEdit = updatePitchIdInput.value;
    let objEdit = {
      title: updatePitchTitleInput.value,
      image: updatePitchImageInput.value,
      category: updatePitchCategoryInput.value,
      founder: updatePitchfounderInput.value,
      price: updatePitchPriceInput.value,
    };

    fetch(`${pitchURL}/${idEdit}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(objEdit),
    }).then((res) => {
      if (res.ok) {
        updatePitchIdInput.value=null;
        updatePitchTitleInput.value = null;
        updatePitchImageInput.value = null;
        updatePitchCategoryInput.value = null;
        updatePitchfounderInput.value = null;
        updatePitchPriceInput.value = null;
        getPitches()
      }
    });
  });

  updatePricePitchPriceButton.addEventListener("click", () => {
    let idEdit = updatePricePitchId.value;
    let objEdit = {
      price: updatePricePitchPrice.value,
      id: updatePricePitchId.value,
    };

    fetch(`${pitchURL}/${idEdit}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(objEdit),
    }).then((res) => {
      if (res.ok) {
        updatePitchIdInput.value = null;
        updatePitchTitleInput.value = null;
        updatePitchImageInput.value = null;
        updatePitchCategoryInput.value = null;
        updatePitchfounderInput.value = null;
        updatePitchPriceInput.value = null;

        updatePricePitchPrice.value = null;
        updatePricePitchId.value=null;
        getPitches();
      }
    });
  });


  let deleteBtn = document.querySelectorAll(".card-button");
  deleteBtn.forEach((el) => {
    el.addEventListener("click", async () => {
      let id = el.dataset.id
      try {
        let res = await fetch(`${pitchURL}/${id}`, {
          method:"DELETE"
        })
        let out = await res.json()
        getPitches()
      } catch (error) {
        console.log(error)
      }
    })
  })
}

pitchCreateBtn.addEventListener("click",addPitch)
function addPitch() {
  let obj = {
    title: pitchTitleInput.value,
    image: pitchImageInput.value,
    category: pitchCategoryInput.value,
    founder: pitchfounderInput.value,
    price: pitchPriceInput.value,
  };

  fetch(`${pitchURL}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(obj),
  }).then((res) => {
    if (res.ok) {
      // updatePitchIdInput.value=null;
      pitchTitleInput.value = null;
      pitchImageInput.value = null;
      pitchCategoryInput.value = null;
      pitchfounderInput.value = null;
      pitchPriceInput.value = null;
      getPitches();
    }
  });
}