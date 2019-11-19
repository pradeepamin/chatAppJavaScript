


app.service('servicesLogin', function ($http, $location, SocketService) {

   
    this.login = (data, $scope) => {
        //sending the data as a http request
        console.log("asdlfjlasdjf",data);
        
        try {
            $http({
                method: 'POST',
                url: 'http://localhost:3000/login',
                data: data
            }).then(function sucessCallback(response) {
                let user = response.data[0];
                console.log("response in servicesssss",response);
                
                $location.path("/userDashbord");
                //storing the values in localstorage
                console.log("Login sucess ==>", response);
            },
                function errrCallback(response) {
                    $scope.result = "In correct Email and password ";
                    console.log("Login UnSucessFull ===>", response);
                });
        } catch (e) {
            console.log(e);
        }
    }
    
    this.register = (data, $scope) => {
        try {
            $http({
                method: 'POST',
                url: 'http://localhost:3000/register',
                data: data
            }).then(function sucessCallback(response) {
                //direct to specified path
                $location.path("/login");
                console.log("Register sucess ==>", response);
            }, function errrCallback(response) {
                if ($scope.email != null)
                    $scope.result = response.data;
                else
                    $scope.result = response.data.error[0].msg;
                console.log("Register UnSucessFull ===>", response);
            });
        } catch (e) {
            console.log(e);
        }

    }


    
    this.forgotPassword = (data, $scope) => {
        try {
            $http({
                method: 'POST',
                url: 'http://localhost:3000/forgotPassword',
                data: data
            }).then(function sucessCallback(response) {
                $scope.result = "Verification sent to mail..Plz verify "
                console.log("Verify sucess ==>", response);
            },
                function errrCallback(response) {
                    if ($scope.email == null)
                        $scope.result = response.data.error[0].msg;
                    else
                        $scope.result = "Email not Exist";
                    console.log("verify UnSucessFull ===>", response);
                });
        } catch (e) {
            console.log(e);
        }
    }

   
    this.resetPassword = (data, $scope) => {
        var url= window.location.href;
        console.log("Reset password");
        var token=url.split("/");
        console.log("To check token",token[5]);
        var tok=token[5]
        console.log("reset password data",data);
        try {
            $http({
                method: 'POST',
                url: `http://localhost:3000/resetpassword/${tok}`,
                data: data
            }).then(function sucessCallback(response) {
                $scope.result = "Changed Sucessfully";
                console.log("changed sucess ==>", response.status);
            },
                function errrCallback(response) {
                    if ($scope.password == null && $scope.confirmPassword == null)
                        $scope.result = response.data.error[0].msg;
                    else
                        $scope.result = "Week Password";
                    console.log("changed UnSucessFull ===>", response);
                });
        } catch (e) {
            console.log(e);
        }
    }
    
});