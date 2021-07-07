'use strict';

const headerCityButton = document.querySelector('.header__city-button');

headerCityButton.textContent = localStorage.getItem('lomoda-location') || 'Ваш город?';

headerCityButton.addEventListener('click', () => {
  const city = prompt('Укажите ваш город');
  headerCityButton.textContent = city;
  localStorage.setItem('lomoda-location', city);
});

// блокировка скролла

const disableScroll = () => {
  const widthScroll = window.innerWidth - document.body.offsetWidth;
  
  document.body.dbScrollY = window.scrollY;

  document.body.style.cssText = `
    position: fixed;
    top: ${-window.scrollY}px;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    padding-right: ${widthScroll}px;
  `;
};

const enableScroll = () => {
  document.body.style.cssText = '';
  window.scroll({
    top: document.body.dbScrollY,
  });
};


// модальное окно

const subheaderCart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');


const cartModalOpen = () => {
  cartOverlay.classList.add('cart-overlay-open');
  disableScroll();
};

const cartModalClose = () => {
  cartOverlay.classList.remove('cart-overlay-open');
  enableScroll();
};

// запрос базы данных
const getData = async () => {
  const data = await fetch('db.json');
  
  if (data.ok) {
    return data.json();
  } else {
    throw new Error(`Данные не были получены, ошибка ${data.status} ${data.statusText}`);
  } //console.log(data);
};

const getGoods = (callback) => {
  getData()
    .then(data => {
      callback(data);
    })
    .catch(err => {
      console.error(err);
    });
};
// можно будет потом удалить
getGoods((data) => {
  console.warn(data);
});


subheaderCart.addEventListener('click', cartModalOpen);

cartOverlay.addEventListener('click', event => {
  const target = event.target;

  if (target.matches('.cart__btn-close') || target.matches('.cart-overlay')) {
    cartModalClose();
  }
});

/*
getData().then(data => {
  console.log(data);
}).catch(err => {
  console.error(err);
});*/

/*
getData().then(data => {
  console.log(data);
}, err => {
  console.error(err);
});*/

//console.log('getData(): ', getData());
//getData();

// data2 выполнится раньше, чем data, т.к. data2 не асинхронна
/*const getData2 = () => {
  const data = fetch('db.json');

  if (data.ok) {
    return data.json();
  }
  //console.log(data);
};
//getData2();
console.log('getData2(): ', getData2());
*/