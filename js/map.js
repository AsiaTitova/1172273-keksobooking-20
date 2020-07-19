'use strict';

(function () {
  var MAIN_MARKER_TIP_HEIGHT = 22;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MIN_X = 0;
  var MAX_X = 1200;

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

  function addElement(element) {
    map.appendChild(element);
  }

  function setClickMainPinListener(callback) {
    mainPin.addEventListener('click', function (evt) {
      evt.preventDefault();
      callback();
    });
  }

  function deactivateMap() {
    map.classList.add('map--faded');
    returnMainPinCenterMap();
  }

  function activateMap() {
    map.classList.remove('map--faded');
  }

  function getPositionPin() {
    var pin = document.querySelector('.map__pin--main');
    var positionY = pin.offsetTop;
    var positionX = pin.offsetLeft;
    if (map.classList.contains('map--faded')) {
      var coordinateX = Math.round(positionX + mainPin.offsetWidth / 2);
      var coordinateY = Math.round(positionY + mainPin.offsetHeight / 2);
    } else {
      coordinateX = Math.round(positionX + mainPin.offsetWidth / 2);
      coordinateY = Math.round(positionY + mainPin.offsetHeight + MAIN_MARKER_TIP_HEIGHT);
    }
    var coordinates = coordinateX + ', ' + coordinateY;
    return coordinates;
  }

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newPinMainPosition = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      function getNewCoords(coordinates) {
        return {
          x: coordinates.x + mainPin.offsetWidth / 2,
          y: coordinates.y + (mainPin.offsetHeight + MAIN_MARKER_TIP_HEIGHT)
        };
      }
      var newCoords = getNewCoords(newPinMainPosition);

      if (newCoords.x <= MAX_X && newCoords.x >= MIN_X) {
        mainPin.style.left = newPinMainPosition.x + 'px';
      }
      if (newCoords.y <= MAX_Y && newCoords.y >= MIN_Y) {
        mainPin.style.top = newPinMainPosition.y + 'px';
      }

      window.form.fillAddress(getPositionPin());
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mainPin.removeEventListener('click', onClickPreventDefault);
        };
        mainPin.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function returnMainPinCenterMap() {
    mainPin.style.left = map.offsetWidth / 2 + 'px';
    mainPin.style.top = map.offsetHeight / 2 + 'px';
  }


  window.map = {
    activate: activateMap,
    deactivate: deactivateMap,
    getPositionPin: getPositionPin,
    addElement: addElement,
    setClickMainPinListener: setClickMainPinListener
  };
})();
