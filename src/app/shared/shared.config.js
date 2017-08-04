(function () {
  'use strict';

  angular
    .module('app')
    .constant('API_SERVER', 'http://127.0.0.1:1234/api/')
    .constant('MEMBER_STATUS', {
      0: 'Joining',
      1: 'Up',
      2: 'Leaving',
      3: 'Exiting',
      4: 'Down',
      5: 'Removed'
    });
})();
