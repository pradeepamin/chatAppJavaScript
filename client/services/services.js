/**
* @desc is a controler function ,contains all opertions to perform when registering
* @param servicesLogin ,invokes when the login page invoked
* @param $scope ,inheriates the parent process $rootScope,which can be used throught this session.
* @param servicesLogin,creting an service contoler for logincontrol.
* @param $location,is a global scope,used to redirect the pages.
*/

(function(){
    var app=angular.module('myApp');

    app.service('servicesLogin', function ($http, $location, SocketService) {
        /**
     * @desc invokes when user try to login
     * @param data contains users login details.
     * @param $scope is a cild process of rootSope contains session values
     * @return sucess or failure
     * */
        this.login = (data, $scope) => {
            //sending the data as a http request
            console.log("logiasdn data",data);
            
            try {
                $http({
                    method: 'POST',
                    url: 'http://localhost:3000/login',
                    data: data
                
                }).then(function sucessCallback(response) {
                    let user = response.data.data;
                   localStorage.setItem('firstName',user['firstName'])

    

                    $location.path("/userDashbord");
                },
                    function errrCallback(response) {
                        $scope.result = "In correct Email and password ";
                        console.log("Login UnSucessFull ===>", response);
                    });
                    console.log("data of loogon",data);
            } catch (e) {
                console.log(e);
            }
        }
        /**
     * @desc register   gets the data from front end pass the data to service
     * @param data contains users register details.
     * @param $scope is a cild process of rootSope contains session values
     * @return sucess or failure
     * */
        
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
           /**
     * @desc invokes when clicks on forgot password
     * @param data contains users login details.
     * @param $scope is a cild process of rootSope contains session values
     * @return sucess or failure
     * */
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
    
         /**
         * @desc invokes when clicks on verification link 
         * @param data contains users login details.
         * @param $scope is a cild process of rootSope contains session values
         * @return sucess or failure
         * */
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
})();
