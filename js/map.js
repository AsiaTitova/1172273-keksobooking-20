'use strict';

(function () {
  var MAIN_MARKER_WIDTH = 62;
  var MAIN_MARKER_HEIGHT = 62;
  var MAIN_MARKER_TIP_HEIGHT = 22;
  var MAP_START_Y = 130;
  var MAP_END_Y = 630;
  var MAP_START_X = 0;
  var MAP_END_X = 1200;
  var LEFT_MOUSE_BUTTON = 1;
  var ENTER = 13;

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var mapPins = map.querySelector('.map__pins');

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
      var coordinateX = Math.round(positionX + MAIN_MARKER_WIDTH / 2);
      var coordinateY = Math.round(positionY + MAIN_MARKER_HEIGHT / 2);
    } else {
      coordinateX = Math.round(positionX + MAIN_MARKER_WIDTH / 2);
      coordinateY = Math.round(positionY + MAIN_MARKER_HEIGHT + MAIN_MARKER_TIP_HEIGHT);
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

        // Проверка границ перемещения пина
        var minY = MAP_START_Y - (MAIN_MARKER_HEIGHT + MAIN_MARKER_TIP_HEIGHT);
        var maxY = MAP_END_Y - (MAIN_MARKER_HEIGHT + MAIN_MARKER_TIP_HEIGHT);

        if (coordinates.x < MAP_START_X) {
          coordinates.x = MAP_START_X;
        } else if (coordinates.x > MAP_END_X) {
          coordinates.x = MAP_END_X;
        }

        if (coordinates.y < minY) {
          coordinates.y = minY;
        } else if (coordinates.y > maxY) {
          coordinates.y = maxY;
        }

        return coordinates.x + ', ' + coordinates.y;
      }

      var newCoords = getNewCoords(newPinMainPosition);

      mainPin.style.left = newPinMainPosition.x + 'px';
      mainPin.style.top = newPinMainPosition.y + 'px';
      window.form.fillAddress(newCoords);

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
