
app.controller("loginCtrl", function ($scope, servicesLogin) {
    $scope.submit = () => {
        var data = {
            "email": $scope.email,
            "password": $scope.password
        }
        console.log("data", data);
        console.log("$SCCope",$scope)
        servicesLogin.login(data, $scope);
    }
});

app.controller("registrationCntr", function ($scope, $location, servicesLogin) {
   
    $scope.register = () => {
        var data = {
            "firstName": $scope.firstName,
            "lastName": $scope.lastName,
            "email": $scope.email,
            "password": $scope.password
        }
        servicesLogin.register(data, $scope);
    }
   
    $scope.pageChange = () => {
        //directs to specified path
        $location.path("/#!/login");
    }
});

app.controller("forgotPasswordCtrl", function ($scope, servicesLogin) {
   
    $scope.forgotPassword = () => {
        var data = {
            "email": $scope.email
        }
        servicesLogin.forgotPassword(data, $scope);
    }
});


app.controller("resetPasswordCtrl", function ($scope, servicesLogin, $location) {
    //checks for the token exist,if exist split the toekn from url
    if ($location.url().indexOf('token') !== -1) {
        $scope.token = $location.url().split('=')[1];
        console.log("Token in controler--client", window.location.href())
    }
   
    $scope.resetPassword = () => {
        if ($scope.password == null || $scope.confirmPassword == null) {
            $scope.result = "Passwords Cant be null";
        }
        else {
            var data = {
                "password": $scope.password,
                "confirmPassword": $scope.confirmPassword
            }
            servicesLogin.resetPassword(data, $scope);
        }
    }
});



