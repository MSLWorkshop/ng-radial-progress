angular.module('ng-radial-progress', [])
.provider('radialProgress', [function () {
    
    config = {
        missingDataMsg: 'No data available.'
    };
    this.$get = [function() {
        return {
            getConfig: function(){
                return config;
            }
        };
    }];
    this.setConfig = function(newConfig){
        config = newConfig;
    };
}])
.directive('radialProgress', ['$rootScope', '$timeout', 'radialProgress', function ($rootScope, $timeout, radialProgress) {
    return {
        restrict: 'A',
        templateUrl: '/js/radialprogress.tpl.html',
        require: 'ngModel',
        scope: {
            defaultPercentage: '@progress'
        },
        link: function (scope, element, iAttsr, NgModelController) {
            var baseIncrement = 180 / 100;
            scope.progress = {
                isVisible: false,
                showMissingDataMsg: false,
                percentage: 0,
                incrementStyle: {},
                incrementFixStyle: {}
            };
            scope.config = radialProgress.getConfig();
            function calculateIncrement(value){
                $timeout(function(){
                    if (isNaN(value)) {
                        scope.progress.isVisible = false;
                        scope.progress.showMissingDataMsg = true;

                        return false;
                    }
                    scope.progress.showMissingDataMsg = false;
                    scope.progress.isVisible = true;
                    scope.progress.percentage = value;
                    scope.progress.incrementStyle = {
                        '-webkit-transform': 'rotate(' + (baseIncrement * value) +'deg)',
                        '-ms-transform': 'rotate(' + (baseIncrement * value) +'deg)',
                        'transform': 'rotate(' + (baseIncrement * value) +'deg)'
                    };
                    scope.progress.incrementFixStyle = {
                        '-webkit-transform': 'rotate(' + (baseIncrement * value * 2) +'deg)',
                        '-ms-transform': 'rotate(' + (baseIncrement * value * 2) +'deg)',
                        'transform': 'rotate(' + (baseIncrement * value * 2) +'deg)'
                    };
                	$rootScope.$emit('radialProgressUpdated', value);
                }, 0, true);
            }
            NgModelController.$render = function() {
                calculateIncrement(NgModelController.$modelValue);
            };
            $rootScope.$on('radialProgressGetData', function(event, callback){
                if (angular.isDefined(callback)) {
                    callback(scope.progress.percentage, scope.progress.isVisible);
                }
            });
        }
    };
}]);
