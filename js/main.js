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

// var mixElement = function (array) {
//   var
// }

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
      features: getRandomElement(attributeDescription.featuresList),
      description: 'Oписание',
      photos: getRandomElement(attributeDescription.photosList)
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

var createCard = function (card) {
  var cardAds = cardTemplate.cloneNode(true);
  cardAds.querySelector('.popup__avatar').textContent = card.author.avatar;

  if (card.offer.title) {
    cardAds.querySelector('.popup__title').textContent = card.offer.title;
  } else {
    cardAds.querySelector('.popup__title').classList.add('visually-hidden');
  }

  if (card.offer.address) {
    cardAds.querySelector('.popup__text--address').textContent = card.offer.address;
  } else {
    cardAds.querySelector('.popup__text--address').classList.add('visually-hidden');
  }

  if (card.offer.price) {
    cardAds.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  } else {
    cardAds.querySelector('.popup__text--price').classList.add('visually-hidden');
  }

  if (card.offer.type) {
    if (card.offer.type === 'bungalo') {
      card.offer.type = 'Бунгало';
    }

    if (card.offer.type === 'flat') {
      card.offer.type = 'Квартира';
    }

    if (card.offer.type === 'house') {
      card.offer.type = 'Дом';
    }

    if (card.offer.type === 'palace') {
      card.offer.type = 'Дворец';
    }

    cardAds.querySelector('.popup__type').textContent = card.offer.type;
  } else {
    cardAds.querySelector('.popup__type').classList.add('visually-hidden');
  }

  if (card.offer.rooms && card.offer.guests) {
    cardAds.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  } else {
    cardAds.querySelector('.popup__text--capacity').classList.add('visually-hidden');
  }

  if (card.offer.checkin && card.offer.checkout) {
    cardAds.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  } else {
    cardAds.querySelector('.popup__text--time').classList.add('visually-hidden');
  }

  if (card.offer.features) {
    for (var i = 0; i < card.offer.features.length; i++) {
      var featuresItem = document.createElement('li');
      featuresItem.classList.add('popup__features');
      featuresItem.classList.add('popup__features--' + featuresItem[i]);
    }
    // cardAds.querySelector('.popup__features').textContent = card.offer.features;
  } else {
    cardAds.querySelector('.popup__features').classList.add('visually-hidden');
  }

  if (card.offer.description) {
    cardAds.querySelector('.popup__description').textContent = card.offer.description;
  } else {
    cardAds.querySelector('.popup__description').classList.add('visually-hidden');
  }

  if (card.offer.photos) {
    for (var j = 0; j < card.offer.photos.length; j++) {
      var photosItem = document.createElement('img');
      photosItem.classList.add('popup__photo');
      cardAds.querySelector('.popup__photo').src = card.offer.photos[j];
      cardAds.querySelector('.popup__photos').appendChild(photosItem);
    }
  } else {
    cardAds.querySelector('.popup__photo').classList.add('visually-hidden');
  }

  return cardAds;
};

var filters = document.querySelector('.map__filters-container');
map.insertBefore(createCard(announcements[0]), filters);
