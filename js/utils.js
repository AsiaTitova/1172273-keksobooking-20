'use strict';

(function () {

  // разблокировать-заблокировать элементы

  function changeDisableStatus(elements, flag) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = flag;
    }
  }

  window.utils = {
    changeDisableStatus: changeDisableStatus
  };

})();
