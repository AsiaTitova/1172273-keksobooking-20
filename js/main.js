'use strict';

// Напишите функцию для создания массива из 8 сгенерированных JS-объектов.
var attributeDescription = {
  avatarList: ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'],
  typeList: ['palace', 'flat', 'house', 'bungalo'],
  featuresList: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  photosList: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
};

var mapWidth = document.querySelector('.map__pins').offsetWidth;
var markerWidth = 40;
var markerHeight = 40;

var getRandomInteger = function (min, max) {
  // случайное число от min до (max+1)
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getRandomElement = function (array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

var makeData = function () {
  return {
    'author': {
      avatar: getRandomElement(attributeDescription.avatarList)
    },
    'offer': {
      title: 'Заголовок предложения',
      address: 'getRandomInteger(0, mapWidth), getRandomInteger(130, 650)',
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
      x: getRandomInteger(0, mapWidth),
      y: getRandomInteger(130, 650)
    }
  };
};

var generateData = function () {
  var arrData = [];
  for (var j = 0; j < 8; j++) {
    var data = makeData();
    arrData.push(data);
  }
  return arrData;
};

var arrDataObj = generateData();

// У блока .map уберите класс .map--faded

var map = document.querySelector('.map');
map.classList.remove('map--faded');

// На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте, и заполните их данными из массива.

var template = document.querySelector('#pin').content.querySelector('button');

var createPin = function (marker) {
  for (var i = 0; i < arrDataObj.length; i++) {
    var markers = template.cloneNode(true);
    markers.style.left = marker.location.x - (markerWidth / 2) + 'px';
    markers.style.top = marker.location.y - markerHeight + 'px';
    markers.querySelector('img').src = marker.author.avatar;
    markers.querySelector('img').alt = 'альтернативная надпись';
  }
  return markers;
};

function renderPin() {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrDataObj.length; i++) {
    fragment.appendChild(createPin(arrDataObj[i]));
  }
  document.querySelector('.map__pins').appendChild(fragment);
}

renderPin();

