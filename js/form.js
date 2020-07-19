'use strict';

(function () {
  var MIN_PRICE_BUNGALO = 0;
  var MIN_PRICE_FLAT = 1000;
  var MIN_PRICE_HOUSE = 5000;
  var MIN_PRICE_PALACE = 10000;

  var form = document.querySelector('.ad-form');
  var formFieldset = form.querySelectorAll('.ad-form__element');
  var resetForm = document.querySelector('.ad-form__reset');

  // заблокировать активные поля формы и её отчистка

  function disableForm() {
    form.classList.add('ad-form--disabled');
    window.utils.changeDisableStatus(formFieldset, true);
    clearForm();
    window.clearPreview();
  }

  // переводим форму в активное состояние

  function activateForm() {
    form.classList.remove('ad-form--disabled');
    window.utils.changeDisableStatus(formFieldset, false);
  }

  // заполнение полей адерса

  function fillAddress(coordinates) {
    var address = form.querySelector('#address');
    address.value = coordinates;
  }

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

  // отправка формы, работа с сервером

  function getFormData() {
    return new FormData(form);
  }

  // событие отправка формы

  function setSubmitListener(callback) {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      callback();
    });
  }

  // отчистка формы
  function clearForm() {
    form.reset();
  }

  // событие отчистка формы нажатием на кнопку отчистить

  function setResetListener(callback) {
    resetForm.addEventListener('click', function (evt) {
      evt.preventDefault();
      callback();
    });
  }

  window.form = {
    activateForm: activateForm,
    disableForm: disableForm,
    fillAddress: fillAddress,
    setSubmitListener: setSubmitListener,
    setResetListener: setResetListener,
    getFormData: getFormData
  };
})();

