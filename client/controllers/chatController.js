(function () {
    var app = angular.module('myApp');

    app.controller('controllerChat', function ($timeout, $scope, chatService, SocketService) {

      /**
         * @description:to call getalluser templates as on the request
         * @param:$scope
         */
        $scope.firstName=localStorage.getItem('firstName');
        chatService.getUser().then(function successCallBack(response) {
            $scope.allUsers = response.data.filter((friendsId) => {
                console.log("Frieds id",friendsId)
                return $scope.firstName!=friendsId.firstName;
            });
        },
            function errorCallBack(error) {
                $scope.value = "user register not done..";
                console.log("failed", error);
            });


        // $scope.storeMsg = () => {
        //     let msgBoth = JSON.parse(localStorage.getItem('chat'));
        //     var data = {
        //         "from": $scope.userEmail,
        //         "to": msgBoth.to,
        //         "msg": $scope.msg1
        //     }
        //     SocketService.emit("Storemsg", data);
        //     SocketService.on("update data", (data) => {
        //         $scope.msg.push(data)
        //     })
        //     console.log("controler in store msg");

        //     console.log("data storeMsg email...", msgBoth);

        // }

        $scope.person = (receiverEmail) => {
            $scope.receiverEmail = receiverEmail;

            console.log("scope value", $scope.receiverEmail);
            
            chatService.getMsg($scope).then(function successCallBack(response){                
                $scope.msgs=response.data;
                console.log("Scope mesages+++++",$scope.msgs)
                SocketService.emit("updatedlist in service",response.data)
                console.log("MESSGAEES******",msgs)
            },
            function errorCallBack(error){
                $scope.value="no user register";
                console.log("failed",error);
            }
            );
        }


        $scope.logout = () => {
            try {
                localStorage.clear();
                chatService.logout();
            } catch (e) {
                console.log(e);
            }
        }
    });

})();
