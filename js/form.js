'use strict';

(function () {
  var MIN_PRICE_BUNGALO = 0;
  var MIN_PRICE_FLAT = 1000;
  var MIN_PRICE_HOUSE = 5000;
  var MIN_PRICE_PALACE = 10000;

  var form = document.querySelector('.ad-form');
  var formFieldset = form.querySelectorAll('.ad-form__element');
  var resetForm = document.querySelector('.ad-form__reset');
  var priceInput = form.querySelector('#price');
  var typeInput = form.querySelector('#type');
  var checkInInput = form.querySelector('#timein');
  var checkOutInput = form.querySelector('#timeout');
  var roomsInput = form.querySelector('#room_number');
  var guestsInput = form.querySelector('#capacity');

  checkInInput.addEventListener('input', function () {
    checkOutInput.value = checkInInput.value;
  });

  checkOutInput.addEventListener('input', function () {
    checkInInput.value = checkOutInput.value;
  });

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

  function setMinPrice(input, minPrice) {
    input.setAttribute('min', minPrice);
    input.placeholder = minPrice;
  }

  function getFormData() {
    return new FormData(form);
  }

  function setSubmitListener(callback) {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      callback();
    });
  }

  function clearForm() {
    form.reset();
  }

  function setResetListener(callback) {
    resetForm.addEventListener('click', function (evt) {
      evt.preventDefault();
      callback();
    });
  }

  function disableForm() {
    form.classList.add('ad-form--disabled');
    window.utils.changeDisableStatus(formFieldset, true);
    clearForm();
    window.clearPreview();
  }

  function activateForm() {
    form.classList.remove('ad-form--disabled');
    window.utils.changeDisableStatus(formFieldset, false);
  }

  function fillAddress(coordinates) {
    var address = form.querySelector('#address');
    address.value = coordinates;
  }

  window.form = {
    activate: activateForm,
    disable: disableForm,
    fillAddress: fillAddress,
    setSubmitListener: setSubmitListener,
    setResetListener: setResetListener,
    getFormData: getFormData
  };
})();

