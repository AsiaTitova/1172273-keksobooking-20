'use strict';

(function () {
  var ESC = 27;

  function changeDisableStatus(elements, flag) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = flag;
    }
  }


  window.utils = {
    changeDisableStatus: changeDisableStatus,
    esc: ESC
  };

})();
