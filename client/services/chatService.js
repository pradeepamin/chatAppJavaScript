(function () {

    const app = angular.module('myApp');
    /**
        * @description:to call getusername templates as on the request
        * @param:$scope
        */

    app.service("chatService", function ($http, SocketService) {

        this.getUser = function () {
            console.log("service in getAllUser");
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/getUsers'
            });
        }
        /**
       * @description:to call getusermsg templates as on the request
       * @param:$scope,value
       */
        this.getMsg = function ($scope) {
            // let data = {
            //     "from": $scope.firstName,
            //     "to": $scope.receiverEmail
            // };
            return $http({
                method: "GET",
                url: 'http://localhost:3000/getMsg',
                // data: data

            }).then(function sucessCallback(response) {
                console.log("RESPONSE---------*********", response);
                $scope.msgs = response.data;

            },
                function errrCallback(response) {
                    // $scope.value = "No users registred.. ";
                    console.log("fetch UnSucessFull ===>", response);
                })

        }




    })
})();
