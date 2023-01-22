const box = document.querySelector('.main__content-box');
const modal = document.querySelector('.main__modal');
const modalClose = document.querySelector('.main__modal-button');
const modalImg = document.querySelector('.main__modal-img');
const modalTitle = document.querySelector('.main__modal-title');
const modalDescription = document.querySelector('.main__modal-description');
const modalPrice = document.querySelector('.main__modal-price');

async function getData () {
  let response = await fetch("https://fakestoreapi.com/products");
  let data = await response.json();

  data.forEach(item => {
    createCard(item.image, item.title, item.price, item.id)
  })

  box.addEventListener('click', (e) => {
    if (e.target.classList.contains('main__content-btn')) {
      const id = e.target.dataset.id
      const item = data.find(item => item.id == id);
      modalImg.setAttribute('src', item.image);
      modalTitle.textContent = item.title;
      modalDescription.textContent = item.description;
      modalPrice.textContent = `${item.price} $`;
      modal.classList.add('active')
    }    
  })
}

getData()

function createCard(itemImg, itemTitle, itemPrice, itemID) {
  const card = document.createElement('div');
  card.classList.add('main__content-card');
  const imgBox = document.createElement('div');
  imgBox.classList.add('main__content-imgBox');
  const img = document.createElement('img');
  img.classList.add('main__content-img');
  img.setAttribute('src', itemImg);
  imgBox.appendChild(img);
  card.appendChild(imgBox);
  const title = document.createElement('h2');
  title.classList.add('main__content-title');
  title.textContent = itemTitle;
  card.appendChild(title);
  const footer = document.createElement('div');
  footer.classList.add('main__content-footer');  
  const price = document.createElement('p');
  price.classList.add('main__content-price');
  price.textContent = `${itemPrice} $`;
  const button = document.createElement('button');
  button.classList.add('main__content-btn');
  button.setAttribute('data-id', itemID);
  button.textContent = "OPEN"
  footer.appendChild(price);
  footer.appendChild(button);
  card.appendChild(footer);
  box.appendChild(card);
}

modalClose.addEventListener('click', () => {
  modal.classList.remove('active');
})