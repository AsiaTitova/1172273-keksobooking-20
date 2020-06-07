'use strict';

// Напишите функцию для создания массива из 8 сгенерированных JS-объектов.
var attributeDescription = {
  typeList: ['palace', 'flat', 'house', 'bungalo'],
  featuresList: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  photosList: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
};

var mapWidth = document.querySelector('.map__pins').offsetWidth;
var markerWidth = 40;
var markerHeight = 40;
var avatarName = 'img/avatars/user0';
var avatarFormat = '.png';
var numberCycles = 8;


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
  var locationX = getRandomInteger(0, mapWidth);
  var locationY = getRandomInteger(130, 650);
  return {
    'author': {
      avatar: avatarName + (count + 1) + avatarFormat
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
  var arrData = [];
  for (var j = 0; j < numberCycles; j++) {
    var data = makeData();
    arrData.push(data);
  }
  return arrData;
};

var arrDataCollection = generateData();

// У блока .map уберите класс .map--faded

var map = document.querySelector('.map');
map.classList.remove('map--faded');

// На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте, и заполните их данными из массива.

var template = document.querySelector('#pin').content.querySelector('button');

var createPin = function (marker) {
  var markers = template.cloneNode(true);
  markers.style.left = marker.location.x - (markerWidth / 2) + 'px';
  markers.style.top = marker.location.y - markerHeight + 'px';
  markers.querySelector('img').src = marker.author.avatar;
  markers.querySelector('img').alt = 'альтернативная надпись';
  return markers;
};

function renderPin() {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrDataCollection.length; i++) {
    fragment.appendChild(createPin(arrDataCollection[i]));
  }
  document.querySelector('.map__pins').appendChild(fragment);
}

renderPin(numberCycles);
// document.querySelector('.map').appendChild(renderPin(generateData(numberCycles)));
