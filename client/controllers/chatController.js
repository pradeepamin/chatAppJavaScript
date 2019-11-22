
/**
* @desc is a controler function ,contains all opertions to perform on resetPassword
* @param listUsers,invokes when  user login is sucess
* @param $scope ,inheriates the parent process $rootScope,which can be used throught this session.
* @param servicesLogin,creting an service contoler for logincontrol.
* @param $location,is a global scope,used to redirect the pages.
* @param SocketService is a function,return scoket connection
*/
app.controller('controllerChat', function ($scope, getUserService, SocketService) {
    console.log('get user controller called...');
    $scope.msgData = []
    $scope.getUser = ($scope) => {
        getUserService.getUserServiceData($scope);
    }
    $scope.getUser($scope);

    /**  
     * get msg controller
    */
    $scope.person = function (x) {
        localStorage.setItem('receiverId', x._id);
        localStorage.setItem('receiverName', x.firstName);
        $scope.getUserMsg();
    }
    /**
     * this method will call get user msg service
     */
    $scope.getUserMsg = function () {
        getUserService.getUserMsgService($scope);
    }

    /**
     * send msg controller
     */
    $scope.sendMsg = function () {
        let sendMsgData = {
            from: localStorage.getItem('loginId'),
            to: localStorage.getItem('receiverId'),
            msg: $scope.msg
        }
        console.log("send adsdsfdsfasdfmsg data--", sendMsgData)
        SocketService.emit("newMsg", sendMsgData);
        SocketService.on("Message", data => {
            if ($scope.msgData === undefined) {
                $scope.msgData = data;//assigning message to variable
            } else {
                $scope.msgData.push(data);
                console.log("new message",$scope.msgData);
                
            }
            // console.log("message os ", data)
            // $route.reload();
        })
    }
   
    $scope.clearTextArea = function () {
        console.log('in clear test area');
        $scope.msg = '';
    }

    $scope.logout = function () {
        $location.path('/login');
    }

});








