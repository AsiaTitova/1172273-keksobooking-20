'use strict';

(function () {
  var LEFT_MOUSE_BUTTON = 1;
  var ENTER = 13;
  var MIN_PRICE_BUNGALO = 0;
  var MIN_PRICE_FLAT = 1000;
  var MIN_PRICE_HOUSE = 5000;
  var MIN_PRICE_PALACE = 10000;

  var form = document.querySelector('.ad-form');
  var formFieldset = form.querySelectorAll('.ad-form__element');
  var map = document.querySelector('.map');

  // заблокировать активные поля формы

  var disableElements = function (element) {
    for (var i = 0; i < element.length; i++) {
      element[i].setAttribute('disabled', 'disabled');
    }
  };

  disableElements(formFieldset);

  // разблокировать активные поля формы

  var activateElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled', 'disabled');
    }
  };

  // переводим страницу в активное состояние

  var activatePage = function () {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    activateElements(formFieldset);
    window.pin.renderPins(window.data.announcements);
  };

  // нажатием левой кнопки мыши
  var mainPin = document.querySelector('.map__pin--main');
  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.which === LEFT_MOUSE_BUTTON) {
      evt.preventDefault();
      activatePage();
    }
  });

  // нажатием клавиши Enter
  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER) {
      evt.preventDefault();
      activatePage();
    }
  });

  // заполнение полей ввода

  var fillFormField = function (input, content) {
    input.value = content;
  };

  // заполнение поля адреса

  var address = form.querySelector('#address');
  fillFormField(address, window.map.getPositionPin);

  // валидация формы

  var priceInput = form.querySelector('#price');
  var typeInput = form.querySelector('#type');

  // функция установки минимальной цены

  var setMinPrice = function (input, minPrice) {
    input.setAttribute('min', minPrice);
    input.placeholder = minPrice;
  };

  priceInput.addEventListener('change', function () {
    switch (true) {
      case typeInput.value === 'bungalo':
        return setMinPrice(priceInput, MIN_PRICE_BUNGALO);

      case typeInput.value === 'flat':
        return setMinPrice(priceInput, MIN_PRICE_FLAT);

      case typeInput.value === 'house':
        return setMinPrice(priceInput, MIN_PRICE_HOUSE);

      default:
        return setMinPrice(priceInput, MIN_PRICE_PALACE);
    }
  });

  // синхронизировать время заезда и выезда

  var checkInInput = form.querySelector('#timein');
  var checkOutInput = form.querySelector('#timeout');

  checkInInput.addEventListener('input', function () {
    checkOutInput.value = checkInInput.value;
  });

  checkOutInput.addEventListener('input', function () {
    checkInInput.value = checkOutInput.value;
  });

  // зависимость количества гостей от количества комнат

  var roomsInput = form.querySelector('#room_number');
  var guestsInput = form.querySelector('#capacity');

  guestsInput.addEventListener('change', function () {
    switch (true) {
      case roomsInput.value !== '100' && guestsInput.value === '0':
        return guestsInput.setCustomValidity('Выберете колличество гостей');

      case roomsInput.value < guestsInput.value:
        return guestsInput.setCustomValidity('Количество гостей не может привышать количество комнат');

      case roomsInput.value === '100' && guestsInput.value !== '0':
        return guestsInput.setCustomValidity('Данный тип жилья не для гостей');

      default:
        return guestsInput.setCustomValidity('');
    }
  });

  window.form = {
    disableElements: disableElements,
    activatePage: activatePage
  };

})();

