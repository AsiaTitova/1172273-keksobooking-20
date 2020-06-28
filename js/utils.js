'use strict';

(function () {
  var LEFT_MOUSE_BUTTON = 1;

  // разблокировать элементы
  var activateElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled', 'disabled');
    }
  };

  // закрыть элемент на странице
  function closeElement(element) {
    if (element) {
      element.remove();
    }
  }

  window.utils = {
    activateElements: activateElements,
    closeElement: closeElement
  };

})();
