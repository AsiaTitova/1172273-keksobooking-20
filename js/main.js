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
      price: getRandomInteger(500, 10000),
      type: getRandomElement(attributeDescription.typeList),
      rooms: getRandomInteger(1, 4),
      guests: getRandomInteger(1, 10),
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

var adsCollection = generateData();

// У блока .map уберите класс .map--faded

var map = document.querySelector('.map');
map.classList.remove('map--faded');

// На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте, и заполните их данными из массива.

var template = document.querySelector('#pin').content.querySelector('button');

var createPin = function (offer) {
  var pin = template.cloneNode(true);
  pin.style.left = offer.location.x - (MARKER_WIDTH / 2) + 'px';
  pin.style.top = offer.location.y - MARKER_HEIGHT + 'px';
  pin.querySelector('img').src = offer.author.avatar;
  pin.querySelector('img').alt = 'альтернативная надпись';
  return pin;
};

function renderPins(advert) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adsCollection.length; i++) {
    fragment.appendChild(createPin(adsCollection[i]));
  }
  document.querySelector('.map__pins').appendChild(fragment);
}

renderPins(NUMBER_CYCLES);
