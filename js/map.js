'use strict';

(function () {
  var MAIN_MARKER_TIP_HEIGHT = 22;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MIN_X = 0;
  var MAX_X = 1200;
  var LEFT_MOUSE_BUTTON = 1;
  var ENTER = 13;

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

  // переводим страницу в неактивное состояние

  function deactivateMap() {
    map.classList.add('map--faded');
  }

  // переводим карту в активное состояние
  function activateMap() {
    map.classList.remove('map--faded');
  }

  // добавление событий на главную метку

  function setMousedownListener(callback) {
    mainPin.addEventListener('mousedown', function (evt) {
      if (evt.which === LEFT_MOUSE_BUTTON) {
        evt.preventDefault();
        callback();
      }
    });
  }

  function setKeydownListener(callback) {
    mainPin.addEventListener('mousedown', function (evt) {
      if (evt.which === ENTER) {
        evt.preventDefault();
        callback();
      }
    });
  }

  // добавление элементов на карту (пины, карточки объявлений)

  function addElement(element) {
    map.appendChild(element);
  }

  // определяем координаты главной метки на карте

  function getPositionPin() {
    // ищем нужный элемент;
    var pin = document.querySelector('.map__pin--main');
    // верхний отступ эл-та от родителя;
    var positionY = pin.offsetTop;
    // левый отступ эл-та от родителя;
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

  // перемещение основной метки по карте

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // начальные координаты
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    // функция передвижения пина
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
          x: coordinates.x - mainPin.offsetWidth / 2 + 'px',
          y: coordinates.y - (mainPin.offsetHeight + MAIN_MARKER_TIP_HEIGHT) + 'px'
        };
      }
      var newCoords = getNewCoords(newPinMainPosition);

      if (newCoords.x <= MAX_X && newCoords.x >= MIN_X) {
        mainPin.style.left = newCoords.x + 'px';
      }
      if (newCoords.y <= MAX_Y && newCoords.y >= MIN_Y) {
        mainPin.style.top = newPinMainPosition.y + 'px';
      }

      window.form.fillAddress(getPositionPin());
    };

    // функция установки пина при отпускании кнопки мыши
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


  window.map = {
    activateMap: activateMap,
    deactivateMap: deactivateMap,
    getPositionPin: getPositionPin,
    addElement: addElement,
    setMousedownListener: setMousedownListener,
    setKeydownListener: setKeydownListener
  };
})();
