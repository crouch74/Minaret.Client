(function () {
  'use strict';

  angular
    .module('app')
    .component('overviewComponent', {
      templateUrl: 'app/overview/overview.html',
      controller: OverviewController,
      controllerAs: 'vm'
    });

  OverviewController.$inject = ['ClusterService', 'MEMBER_STATUS', 'NgTableParams', '$timeout'];

  function OverviewController(ClusterService, MEMBER_STATUS, NgTableParams, $timeout) {
    const vm = this;

    vm.getAddressAsString = getAddressAsString;
    vm.getMemberStatusName = getMemberStatusName;
    vm.joinList = joinList;

    activate();

    function activate() {
      refreshData();
      vm.clusterStatus = {};
      vm.membersTableParams = new NgTableParams();
      vm.unreachableTableParams = new NgTableParams();
      vm.seenByTableParams = new NgTableParams();
      vm.refreshData = refreshData;
    }

    function getAddressAsString(address) {
      if (!address) {
        return;
      }
      return `${address.protocol}://${address.system}@${address.host}:${address.port}`;
    }

    function getMemberStatusName(status) {
      return MEMBER_STATUS[status];
    }

    function joinList(list) {
      if (!list) {
        return;
      }
      return list.join(', ');
    }

    function refreshTableParams() {
      vm.membersTableParams.settings({
        counts: [],
        dataset: vm.clusterStatus.members
      });
      vm.unreachableTableParams.settings({
        counts: [],
        dataset: vm.clusterStatus.unreachable
      });
      vm.seenByTableParams.settings({
        counts: [],
        dataset: vm.clusterStatus.seenBy
      });
    }

    function refreshData(withoutAutoRefresh) {
      ClusterService.getState()
        .then(data => {
          vm.clusterStatus = data.data;
          refreshTableParams();
          if (withoutAutoRefresh) {
            return;
          }
          $timeout(vm.refreshData, 5000);
        });
    }
  }
})();
