'use strict';

// Напишите функцию для создания массива из 8 сгенерированных JS-объектов.
var attributeDescription = {
  typeList: ['palace', 'flat', 'house', 'bungalo'],
  featuresList: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  photosList: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
};

var MAP_WIDTH = document.querySelector('.map__pins').offsetWidth;
var MARKER_WIDTH = 50;
var MARKER_HEIGHT = 70;
var AVATAR_PATH_FILE = 'img/avatars/user0';
var AVATAR_FORMAT = '.png';
var NUMBER_CYCLES = 8;
var IMG_WIDTH = 45;
var IMG_HEIGHT = 45;
var IMG_ALT = 'Фотография жилья';


// генерируем случайное число

var getRandomInteger = function (min, max) {
  // случайное число от min до (max+1)
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

// генерируем случайный элемент массива

var getRandomElement = function (array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// перемешиваем массив

var mixElement = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var mixItem = Math.floor(Math.random() * (i + 1));
    var arrItem = array[mixItem];
    array[mixItem] = array[i];
    array[i] = arrItem;
  }
  return array;
};

// создаем объект из данных

var makeData = function (count) {
  var locationX = getRandomInteger(0, MAP_WIDTH);
  var locationY = getRandomInteger(130, 650);
  return {
    'author': {
      avatar: AVATAR_PATH_FILE + (count + 1) + AVATAR_FORMAT
    },
    'offer': {
      title: 'Заголовок предложения',
      address: locationX + ' , ' + locationY,
      price: getRandomInteger(0, 1000000),
      type: getRandomElement(attributeDescription.typeList),
      rooms: getRandomInteger(1, 4),
      guests: getRandomInteger(0, 3),
      checkin: getRandomInteger(12, 14) + ':00',
      checkout: getRandomInteger(12, 14) + ':00',
      features: attributeDescription.featuresList,
      description: 'Oписание',
      photos: attributeDescription.photosList
    },
    'location': {
      x: locationX,
      y: locationY
    }
  };
};

// создаем массив из объектов

var generateData = function () {
  var ads = [];
  for (var i = 0; i < NUMBER_CYCLES; i++) {
    var data = makeData(i);
    ads.push(data);
  }
  return ads;
};

var announcements = generateData();

// У блока .map уберите класс .map--faded

var map = document.querySelector('.map');
map.classList.remove('map--faded');

// На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте, и заполните их данными из массива.

var pinTemplate = document.querySelector('#pin').content.querySelector('button');

var createPin = function (offer) {
  var pin = pinTemplate.cloneNode(true);
  pin.style.left = offer.location.x - (MARKER_WIDTH / 2) + 'px';
  pin.style.top = offer.location.y - MARKER_HEIGHT + 'px';
  pin.querySelector('img').src = offer.author.avatar;
  pin.querySelector('img').alt = 'альтернативная надпись';
  return pin;
};

function renderPins(adverts) {
  var fragment = document.createDocumentFragment();
  adverts = announcements;
  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(createPin(adverts[i]));
  }
  document.querySelector('.map__pins').appendChild(fragment);
}

renderPins(NUMBER_CYCLES);

// На основе первого по порядку элемента из сгенерированного массива и шаблона #card создайте DOM-элемент объявления (карточка объявления), заполните его данными из объекта:

var cardTemplate = document.querySelector('#card').content.querySelector('article');

var createTypeCard = function (card) {
  switch (true) {
    case card.offer.type === 'bungalo':
      card.offer.type = 'Бунгало';
      break;

    case card.offer.type === 'flat':
      card.offer.type = 'Квартира';
      break;

    case card.offer.type === 'house':
      card.offer.type = 'Дом';
      break;

    case card.offer.type === 'palace':
      card.offer.type = 'Дворец';
      break;
  }
  return card.offer.type;
};

var createFeature = function (container, feature) {
  for (var i = 0; i < feature.length; i++) {
    var featureItem = document.createElement('li');
    featureItem.classList.add('popup__features');
    featureItem.classList.add('popup__features--' + feature[i]);
    container.querySelector('.popup__features').appendChild(featureItem);
  }
};

var createPhoto = function (container, photos) {
  for (var j = 0; j < photos.length; j++) {
    var photosItem = document.createElement('img');
    photosItem.classList.add('popup__photo');
    container.querySelector('.popup__photo').src = photos[j];
    container.querySelector('.popup__photo').width = IMG_WIDTH;
    container.querySelector('.popup__photo').height = IMG_HEIGHT;
    container.querySelector('.popup__photo').alt = IMG_ALT;
    container.querySelector('.popup__photos').appendChild(photosItem);
  }
};

var createCard = function (card) {
  var cardAd = cardTemplate.cloneNode(true);
  cardAd.querySelector('.popup__avatar').textContent = card.author.avatar || 'no value';

  cardAd.querySelector('.popup__title').textContent = card.offer.title || 'no value';

  cardAd.querySelector('.popup__text--address').textContent = card.offer.address || 'no value';

  cardAd.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь' || 'no value';

  cardAd.querySelector('.popup__type').textContent = createTypeCard(card) || 'no value';

  cardAd.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей' || 'no value';

  cardAd.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout || 'no value';

  cardAd.querySelector('.popup__features').textContent = createFeature(cardAd, card.offer.features) || 'no value';

  cardAd.querySelector('.popup__description').textContent = card.offer.description || 'no value';

  cardAd.querySelector('.popup__photo').textContent = createPhoto(cardAd, card.offer.photos) || 'no value';

  var childElements = cardAd.querySelectorAll(':scope > *');
  childElements.forEach(function (element) {
    if (element.textContent === 'no value') {
      element.classList.add('visually-hidden');
    }
  });

  return cardAd;
};

var filters = document.querySelector('.map__filters-container');
map.insertBefore(createCard(announcements[0]), filters);
