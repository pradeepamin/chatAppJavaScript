app.service("chatService",function($http,SocketService){
    this.getAllUser=function($scope){
        console.log("service in getAllUser");
        $http({
            method:'GET',
            url:'http://localhost:3000/getUsers'
    
        }).then(function successCallBack(response){
            $scope.data=response.data;
            console.log("get all users details",response);
            
        },
        function errorCallBack(error){
            $scope.value="user register not done..";
            console.log("failed",error);
        }
        
        )
    }
    this.getMsg=function($scope,value){
        let data={
            "from":$scope.userEmail,
            "to":value.email
        };
        localStorage.setItem('chat',JSON.stringify(data));
        console.log("DATA.....",data)
        $http({
            method:"GET",
            url:'http://localhost:3000/getMsg',
            data:Data

        }).then(function successCallBack(response){
            $scope.msg=response.data;
            SocketService.emit("updatedlist in service",response.data)
            console.log("getuserMessage",response);
        },
        function errorCallBack(error){
            $scope.value="no user register";
            console.log("failed",error);
        }
        )
    }
 
    this.getUserName = ($scope) => {
        try {
            console.log("service  in getUsername");
            var loginDetails = JSON.parse(localStorage.getItem("user"));
            $scope.userEmail = loginDetails.email;
            $scope.userName = loginDetails.firstName;
            console.log("email ", $scope.userEmail);
            console.log("username: ", $scope.userName);
        } catch (e) {
            console.log(e);
        }
    }

    this.logout = () => {
        localStorage.clear;
        $location.path('/');
    }

})