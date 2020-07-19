'use strict';
(function () {

  var MARKER_WIDTH = 50;
  var MARKER_HEIGHT = 70;

  var pinTemplate = document.querySelector('#pin').content.querySelector('button');

  function createPin(offer, clickHandler) {
    var pin = pinTemplate.cloneNode(true);
    pin.style.left = offer.location.x - (MARKER_WIDTH / 2) + 'px';
    pin.style.top = offer.location.y - MARKER_HEIGHT + 'px';
    pin.querySelector('img').src = offer.author.avatar;
    pin.querySelector('img').alt = 'альтернативная надпись';
    if (clickHandler && typeof clickHandler === 'function') {
      pin.addEventListener('click', clickHandler);
    }
    return pin;
  }

  function removePins() {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (element) {
      element.remove();
    });
  }

  window.pin = {
    create: createPin,
    remove: removePins
  };

})();
