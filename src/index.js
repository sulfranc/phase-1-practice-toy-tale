let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
const BASE_URL = 'http://localhost:3000/toys/'

getToys()

function getToys() {
  fetch(BASE_URL)
  .then(res => res.json())
  .then(data => data.forEach(renderToy))
}

function renderToy(toy) {
  const toyCard = document.createElement('div')
  toyCard.className = 'card'
  
  const toyName = document.createElement('h2')
  toyName.innerText = toy.name
  
  const toyImg = document.createElement('img')
  toyImg.src = toy.image
  toyImg.classList.add('toy-avatar')
  
  const toyLikes = document.createElement('p')
  toyLikes.innerText = `Likes ${toy.likes}`
  toyLikes.className = toy.id
  
  
  const toyBtn = document.createElement('button')
  toyBtn.className = 'like-btn'
  toyBtn.innerText = '<3 like meeee'
  toyBtn.id = toy.id
  
  toyBtn.addEventListener('click', (e) => {
    console.log(e.target.id)
    toy.likes += 1
    
    const newLikes = { likes: toy.likes + 1}
    
    const reqObj = {
      headers: {"Content-Type": "application/json"},
      method: "PATCH",
      body: JSON.stringify(newLikes)
    }
    
    fetch(BASE_URL+e.target.id, reqObj)
    .then(res => res.json())
    .then((updatedToy) => 
      document.getElementsByClassName(updatedToy.id)[0].innerText = `Likes: ${updatedToy.toyLikes}`)
    
  })
  toyCard.append(toyName, toyImg, toyLikes, toyBtn)
  document.querySelector('#toy-collection').appendChild(toyCard)
  
}

function addNewToy() {
  document.querySelector('.add-toy-form').addEventListener('submit', (e) => {
    e.preventDefault()

    const newToy = {
      name: e.target[0].value,
      image: e.target[1].value,
      likes: 0
    }

    const reqObj = {
      headers: {'Content-Type': "application/json"},
      method: "POST",
      body: JSON.stringify(newToy)
    }
    fetch(BASE_URL, reqObj)
    .then(res => res.json())
    .then(renderToy)

  })
}