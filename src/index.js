let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const toyCollection = document.querySelector("#toy-collection")


  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = toyFormContainer.querySelector('form')
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function renderOneToy(toy) {
    let div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
      <h2>${toy.name}</h2>
      <img src="${toy['image']}" class="toy-avatar" />
      <p>${toy.likes} likes</p>
      <button class="like-btn" id="[${toy.id}]">Like ❤️</button>
    `
    let likeButton = div.querySelector(".like-btn")
    likeButton.addEventListener('click', function () {
      addLike(toy)
      
    })

    toyCollection.append(div)
  }

  function addNewToy(toy) {
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body:JSON.stringify({
        "name": `${toy.name}`,
        "image": `${toy.image}`,
        "likes": 0
      })
    }
    )
  }

  form.addEventListener('submit', handleSubmit)
  
  function handleSubmit(e) {
    e.preventDefault();
    let toy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
    addNewToy(toy)
    renderOneToy((toy))
  }



  function addLike(toy) {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": toy.likes+1
      })
    })
    .then(resp => resp.json())
    .then(function (data) {
      toy.likes = data.likes
    })
  }

  


  function getAllToys() {
    fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(function (toys) {
      toys.forEach(toy => {
        renderOneToy(toy);
        
      });
    })
  }




  getAllToys()
});
