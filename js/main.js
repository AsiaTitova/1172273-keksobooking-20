'use strict';

// Напишите функцию для создания массива из 8 сгенерированных JS-объектов.
// var attributeDescription = {
//   typeList: ['palace', 'flat', 'house', 'bungalo'],
//   featuresList: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
//   photosList: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
// };

// var MAP_WIDTH = document.querySelector('.map__pins').offsetWidth;
// var MARKER_WIDTH = 50;
// var MARKER_HEIGHT = 70;
var MAIN_MARKER_WIDTH = 62;
var MAIN_MARKER_HEIGHT = 62;
var MAIN_MARKER_TIP_HEIGHT = 22;
// var AVATAR_PATH_FILE = 'img/avatars/user0';
// var AVATAR_FORMAT = '.png';
// var NUMBER_CYCLES = 8;
// var IMG_WIDTH = 45;
// var IMG_HEIGHT = 40;
// var IMG_ALT = 'Фотография жилья';
var MIN_LENGTH_TITLE = 30;
var MAX_LENGTH_TITLE = 100;
var MAX_PRICE = 1000000;
var MIN_PRICE_BUNGALO = 0;
var MIN_PRICE_FLAT = 1000;
var MIN_PRICE_HOUSE = 5000;
var MIN_PRICE_PALACE = 10000;


// генерируем случайное число

// var getRandomInteger = function (min, max) {
//   // случайное число от min до (max+1)
//   var rand = min + Math.random() * (max + 1 - min);
//   return Math.floor(rand);
// };

// генерируем случайный элемент массива

// var getRandomElement = function (array) {
//   var randomIndex = Math.floor(Math.random() * array.length);
//   return array[randomIndex];
// };

// перемешиваем массив

// var mixElement = function (array) {
//   for (var i = array.length - 1; i > 0; i--) {
//     var mixItem = Math.floor(Math.random() * (i + 1));
//     var arrItem = array[mixItem];
//     array[mixItem] = array[i];
//     array[i] = arrItem;
//   }
//   return array;
// };

// создаем объект из данных

// var makeData = function (count) {
//   var locationX = getRandomInteger(0, MAP_WIDTH);
//   var locationY = getRandomInteger(130, 650);
//   return {
//     'author': {
//       avatar: AVATAR_PATH_FILE + (count + 1) + AVATAR_FORMAT
//     },
//     'offer': {
//       title: 'Заголовок предложения',
//       address: locationX + ' , ' + locationY,
//       price: getRandomInteger(0, 1000000),
//       type: getRandomElement(attributeDescription.typeList),
//       rooms: getRandomInteger(1, 4),
//       guests: getRandomInteger(0, 3),
//       checkin: getRandomInteger(12, 14) + ':00',
//       checkout: getRandomInteger(12, 14) + ':00',
//       features: attributeDescription.featuresList,
//       description: 'Oписание',
//       photos: attributeDescription.photosList
//     },
//     'location': {
//       x: locationX,
//       y: locationY
//     }
//   };
// };

// создаем массив из объектов

// var generateData = function () {
//   var ads = [];
//   for (var i = 0; i < NUMBER_CYCLES; i++) {
//     var data = makeData(i);
//     ads.push(data);
//   }
//   return ads;
// };

// var announcements = generateData();

// // На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте, и заполните их данными из массива.

// var pinTemplate = document.querySelector('#pin').content.querySelector('button');

// var createPin = function (offer) {
//   var pin = pinTemplate.cloneNode(true);
//   pin.style.left = offer.location.x - (MARKER_WIDTH / 2) + 'px';
//   pin.style.top = offer.location.y - MARKER_HEIGHT + 'px';
//   pin.querySelector('img').src = offer.author.avatar;
//   pin.querySelector('img').alt = 'альтернативная надпись';
//   return pin;
// };

// function renderPins(adverts) {
//   var fragment = document.createDocumentFragment();
//   adverts = announcements;
//   for (var i = 0; i < adverts.length; i++) {
//     fragment.appendChild(createPin(adverts[i]));
//   }
//   document.querySelector('.map__pins').appendChild(fragment);
// }

// renderPins(NUMBER_CYCLES);

// На основе первого по порядку элемента из сгенерированного массива и шаблона #card создайте DOM-элемент объявления (карточка объявления), заполните его данными из объекта:

// var cardTemplate = document.querySelector('#card').content.querySelector('article');

// var createTypeCard = function (card) {
//   switch (true) {
//     case card.offer.type === 'bungalo':
//       return 'Бунгало';

//     case card.offer.type === 'flat':
//       return 'Квартира';

//     case card.offer.type === 'house':
//       return 'Дом';

//     default:
//       return 'Дворец';
//   }
// };

// var createFeatures = function (container, feature) {
//   for (var i = 0; i < feature.length; i++) {
//     var featureItem = document.createElement('li');
//     featureItem.classList.add('popup__feature');
//     featureItem.classList.add('popup__feature--' + feature[i]);
//     container.querySelector('.popup__features').appendChild(featureItem);
//   }
// };

// var createPhotos = function (container, photos) {
//   for (var i = 0; i < photos.length; i++) {
//     var photosItem = document.createElement('img');
//     photosItem.classList.add('popup__photo');
//     photosItem.src = photos[i];
//     photosItem.width = IMG_WIDTH;
//     photosItem.height = IMG_HEIGHT;
//     photosItem.alt = IMG_ALT;
//     container.querySelector('.popup__photos').appendChild(photosItem);
//   }
// };

// var createCard = function (card) {
//   var cardAd = cardTemplate.cloneNode(true);
//   cardAd.querySelector('.popup__avatar').textContent = card.author.avatar || 'no value';

//   cardAd.querySelector('.popup__title').textContent = card.offer.title || 'no value';

//   cardAd.querySelector('.popup__text--address').textContent = card.offer.address || 'no value';

//   cardAd.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь' || 'no value';

//   cardAd.querySelector('.popup__type').textContent = createTypeCard(card) || 'no value';

//   cardAd.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей' || 'no value';

//   cardAd.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout || 'no value';

//   cardAd.querySelector('.popup__description').textContent = card.offer.description || 'no value';

//   createFeatures(cardAd, card.offer.features);
//   createPhotos(cardAd, card.offer.photos);

//   var childElements = cardAd.querySelectorAll(':scope > *');
//   childElements.forEach(function (element) {
//     if (element.textContent === 'no value') {
//       element.classList.add('visually-hidden');
//     }
//   });

//   return cardAd;
// };

// var filters = document.querySelector('.map__filters-container');
// map.insertBefore(createCard(announcements[0]), filters);


// заблокировать активные поля формы

var form = document.querySelector('.ad-form');
var formFieldset = form.querySelectorAll('.ad-form__element');

var disableElements = function (element) {
  for (var i = 0; i < element.length; i++) {
    element[i].setAttribute('disabled', 'disabled');
  }
};

disableElements(formFieldset);

// разблокировать активные поля формы

var activateElements = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].removeAttribute('disabled', 'disabled');
  }
};

// переводим страницу в активное состояние

var map = document.querySelector('.map');

var activatePage = function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  activateElements(formFieldset);
};

// нажатием левой кнопки мыши

var mainPin = document.querySelector('.map__pin--main');
mainPin.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    evt.preventDefault();
    activatePage();
  }
});

// нажатием клавиши Enter

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    evt.preventDefault();
    activatePage();
  }
});

// определяем координаты главной метки на карте

var getPositionPin = function () {
  // ищем нужный элемент;
  var pin = document.querySelector('.map__pin--main');
  // верхний отступ эл-та от родителя;
  var positionY = pin.offsetTop;
  // левый отступ эл-та от родителя;
  var positionX = pin.offsetLeft;

  if (map.classList.contains('map--faded')) {
    var coordinateX = Math.round(positionX + MAIN_MARKER_WIDTH / 2);
    var coordinateY = Math.round(positionY + MAIN_MARKER_HEIGHT / 2);
  } else {
    coordinateX = Math.round(positionX + MAIN_MARKER_WIDTH / 2);
    coordinateY = Math.round(positionY + MAIN_MARKER_HEIGHT + MAIN_MARKER_TIP_HEIGHT);
  }
  var coordinates = coordinateX + ', ' + coordinateY;
  return coordinates;
};

// заполнение полей ввода

var fillFormField = function (input, content) {
  input.value = content;
};

// заполнение поля адреса

var address = form.querySelector('#address');
fillFormField(address, getPositionPin());

// валидация формы

var priceInput = form.querySelector('#price');
var typeInput = form.querySelector('#type');

// функция установки минимальной цены

var setMinPrice = function (input, minPrice) {
  input.setAttribute('min', minPrice);
  input.placeholder = minPrice;
  input.setCustomValidity('Цена не может быть меньше ' + minPrice);
};

priceInput.addEventListener('change', function () {
  switch (true) {
    case typeInput.value === 'bungalo':
      return setMinPrice(priceInput, MIN_PRICE_BUNGALO);

    case typeInput.value === 'flat':
      return setMinPrice(priceInput, MIN_PRICE_FLAT);

    case typeInput.value === 'house':
      return setMinPrice(priceInput, MIN_PRICE_HOUSE);

    default:
      return setMinPrice(priceInput, MIN_PRICE_PALACE);
  }
});

// синхронизировать время заезда и выезда

var checkInInput = form.querySelector('#timein');
var checkOutInput = form.querySelector('#timeout');

checkInInput.addEventListener('input', function () {
  checkOutInput.value = checkInInput.value;
});

checkOutInput.addEventListener('input', function () {
  checkInInput.value = checkOutInput.value;
});

// зависимость количества гостей от количества комнат

var roomsInput = form.querySelector('#room_number');
var guestsImput = form.querySelector('#capacity');

guestsImput.addEventListener('change', function () {
  switch (true) {
    case roomsInput.value !== '100' && guestsImput.value === '0':
      return guestsImput.setCustomValidity('Выберете колличество гостей');

    case roomsInput.value < guestsImput.value:
      return guestsImput.setCustomValidity('Количество гостей не может привышать количество комнат');

    case roomsInput.value === '100' && guestsImput.value !== '0':
      return guestsImput.setCustomValidity('Данный тип жилья не для гостей');

    default:
      return guestsImput.setCustomValidity('');
  }
});
