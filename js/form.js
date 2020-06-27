'use strict';

(function () {
  var MIN_PRICE_BUNGALO = 0;
  var MIN_PRICE_FLAT = 1000;
  var MIN_PRICE_HOUSE = 5000;
  var MIN_PRICE_PALACE = 10000;

  var form = document.querySelector('.ad-form');
  var formFieldset = form.querySelectorAll('.ad-form__element');

  // заблокировать активные поля формы
  window.main.disableElements(formFieldset);

  // переводим форму в активное состояние

  var activateForm = function () {
    form.classList.remove('ad-form--disabled');
    window.main.activateElements(formFieldset);
  };

  // заполнение полей ввода

  var fillFormField = function (input, content) {
    input.value = content;
  };

  // заполнение поля адреса

  var address = form.querySelector('#address');
  fillFormField(address, window.map.getPositionPin());

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

  window.activateForm = activateForm;
})();

