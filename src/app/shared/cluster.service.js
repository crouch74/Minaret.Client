(function () {
  'use strict';

  angular
    .module('app')
    .service('ClusterService', ClusterService);

  ClusterService.$inject = ['$http', 'API_SERVER'];

  function ClusterService($http, API_SERVER) {
    const api = `${API_SERVER}cluster`;
    return {
      down,
      getState,
      getRoleMembers,
      leave
    };

    function getState() {
      return $http
        .get(api);
    }

    function leave(address) {
      return $http
        .post(`${api}/leave`, {address});
    }

    function down(address) {
      return $http
        .post(`${api}/down`, {address});
    }

    function getRoleMembers(role) {
      return $http
        .get(`${api}/${role}`);
    }
  }
})();
