'use strict';
var ESCAPE = 27;
var map = document.querySelector('.map');

(function () {
  function onEscPress(evt) {
    if (evt.keyCode === ESCAPE) {
      var card = document.querySelector('.popup');
      if (card) {
        evt.preventDefault();
        card.remove();
      }
      document.removeEventListener('keypress', onEscPress);
    }
  }

  function closeElement(element) {
    if (element) {
      element.remove();
    }
  }

  function closeCard(card) {
    card.querySelector('.popup__close').addEventListener('click', function () {
      card.remove();
      document.removeEventListener('keypress', onEscPress);
    });
  }

  function renderPins(adverts) {
    var filters = document.querySelector('.map__filters-container');
    var fragment = document.createDocumentFragment();
    adverts.forEach(function (ad) {
      var pinElement = window.data.createPin(ad);
      // открытие нужной карточки при нажатии на нужноее объявление
      pinElement.addEventListener('click', function (evt) {

        evt.preventDefault();
        closeElement(document.querySelector('.popup'));
        document.addEventListener('keypress', onEscPress);
        var card = window.card.createCard(ad);
        // закртытие карточки
        closeCard(card);
        map.insertBefore(card, filters);
      });
      fragment.appendChild(pinElement);
    });
    document.querySelector('.map__pins').appendChild(fragment);
  }

  window.pin = {
    renderPins: renderPins
  };
})();
