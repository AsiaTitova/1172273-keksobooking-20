'use strict';
(function () {
  // На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте, и заполните их данными из массива.
  var MARKER_WIDTH = 50;
  var MARKER_HEIGHT = 70;

  var pinTemplate = document.querySelector('#pin').content.querySelector('button');

  function createPin(offer) {
    var pin = pinTemplate.cloneNode(true);
    pin.style.left = offer.location.x - (MARKER_WIDTH / 2) + 'px';
    pin.style.top = offer.location.y - MARKER_HEIGHT + 'px';
    pin.querySelector('img').src = offer.author.avatar;
    pin.querySelector('img').alt = 'альтернативная надпись';
    return pin;
  }

  window.createPin = createPin;
})();
