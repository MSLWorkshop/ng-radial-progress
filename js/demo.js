angular.module('MSLWorkshopDemo', [
    'ng-radial-progress'
])
.controller('DemoCtrl', ['$scope', '$rootScope', '$timeout', function ($scope, $rootScope, $timeout) {
    $scope.data = {
        progress: Math.floor((Math.random() * 100) + 1)
    };
    $scope.updateProgress = function(){
        $rootScope.$emit('radialProgressUpdate', $scope.data.progress);
    };
    $scope.updateProgress();
    $scope.randomProgress = function(){
        $scope.data.progress = Math.floor((Math.random() * 100) + 1);
        $scope.updateProgress();
    };
    function showUpdatedNumber(event, value){
        $scope.updatedNumber = 'The number is ' + value;
    }
    $rootScope.$on('radialProgressUpdate', showUpdatedNumber);
    function callbackGetData(percentage, isVisible){
        console.log(arguments);
        $scope.labelPercentage = 'percentage: ' + percentage;
        $scope.labelIsVsisible = 'isVisible: ' + isVisible;
    }
    $scope.getData = function(){
        $rootScope.$emit('radialProgressGetData', callbackGetData);
    };
}]);
