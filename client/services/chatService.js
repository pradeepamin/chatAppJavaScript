(function(){

    const app=angular.module('myApp');

    app.service("chatService",function($http,SocketService){
        
        this.getUser=function(){
            console.log("service in getAllUser");
            return $http({
                method:'GET',
                url:'http://localhost:3000/getUsers'
        
            });
        }
        this.getMsg=function($scope){
            let data={
                "from":$scope.firstName,
                "to":$scope.receiverEmail
            };
            return $http({
                method:"GET",
                url:'http://localhost:3000/getMsg',
                data:data

        }).then(function sucessCallback(response) {
            console.log("RESPONSE---------*********",response);
            $scope.msgs = response.data;
            console.log("msMESSAGE---------*********",response.data);
            console.log("fetch sucesddddds ==>", response);
        }
            ,
            function errrCallback(response) {
                // $scope.value = "No users registred.. ";
                console.log("fetch UnSucessFull ===>", response);
            })
            
        }
     
        this.getUserName = ($scope) => {
            try {
                console.log("service  in getUsername",$scope);
                var loginDetails = JSON.parse(localStorage.getItem("user"));
                $scope.userEmail = loginDetails.email;
                $scope.userName = loginDetails.firstName;
                console.log("email ", $scope.userEmail);
                console.log("username: ", $scope.userName);
                return $scope.userName;
            } catch (e) {
                console.log(e);
            }
        }
    
        this.logout = () => {
            localStorage.clear;
            $location.path('/');
        }
    
    })
})();
