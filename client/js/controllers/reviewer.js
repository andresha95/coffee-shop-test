angular
    .module('app')
    .controller('MyReviewersController', ['$scope', 'Reviewer', '$rootScope', '$state',
        function($scope, Reviewer, $rootScope, $state){
            $scope.reviewer = Reviewer
                .findById({id: $rootScope.currentUser.id});

            $scope.submitForm = function() {
                Reviewer.prototype$updateAttributes(
                    { id: $scope.reviewer.id },
                    { avatar: $scope.reviewer.avatar })
                    .$promise
                    .then(function (reviewer) {
                        $state.go('my-cabinet-edit');
                    });
            };
        }]);