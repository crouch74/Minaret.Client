(function () {
  'use strict';

  angular
    .module('app')
    .service('ClusterService', ClusterService);

  ClusterService.$inject = ['$http', 'API_SERVER'];

  function ClusterService($http, API_SERVER) {
    const api = `${API_SERVER}cluster`;
    return {
      getState,
      getRoleMembers
    };

    function getState() {
      return $http
        .get(api);
    }

    function getRoleMembers(role) {
      return $http
        .get(`${api}/${role}`);
    }
  }
})();
