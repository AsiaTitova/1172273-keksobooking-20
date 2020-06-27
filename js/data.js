'use strict';

(function () {
  var MAP_WIDTH = document.querySelector('.map__pins').offsetWidth;
  var AVATAR_PATH_FILE = 'img/avatars/user0';
  var AVATAR_FORMAT = '.png';
  var NUMBER_CYCLES = 8;

  var attributeDescription = {
    typeList: ['palace', 'flat', 'house', 'bungalo'],
    featuresList: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    photosList: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
  };

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

  window.data = {
    announcements: announcements,
  };
})();
