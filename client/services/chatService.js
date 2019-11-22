/**
* @desc is a controler function ,contains all opertions to perform chat
* @param getUserService ,invokes when the user details is required
* @param $scope ,inheriates the parent process $rootScope,which can be used throught this session.
* @param $location,is a global scope,used to redirect the pages.
*/

app.service('getUserService', function ($http, $location) {

    this.getUserServiceData = function ($scope) {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/getUsers'
        }).then(function (response) {
            console.log("response in get Users server---", response)
            console.log("Resonse on sucess",response.data.success);

            if (response.data.success = true) {
                $scope.currUser = localStorage.getItem('firstName');
                $scope.currUserId = localStorage.getItem('loginId');
                $scope.userData = response.data.result;
                console.log("all user data-->", $scope.userData);
            } else {
                console.log(response);
                $location.path('/login');              
            }
        }).catch(function (err) {
            $location.path('/login');
            alert('failed...');
        });
    }

    /**
     * get user message
     */

    this.getUserMsgService = function ($scope) {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/getMsg'
        }).then(function (response) {
            $scope.receiverName = localStorage.getItem('receiverName')
            let msgArr = [];
            let senderId = localStorage.getItem('loginId');
            let receiverId = localStorage.getItem('receiverId');
            console.log("response-->",response.data.result);  
            for(let i=0; i < response.data.result.length; i++)
            {
                let list = response.data.result[i];            
                if( (senderId == list.from && receiverId == list.to) 
                    || senderId == list.to && receiverId == list.from)
                {
                    msgArr.push(list);                    
                    // console.log("msgArr--",msgArr)
                }
                $scope.msgData = msgArr;
            }            
            console.log("msgData---",$scope.msgData)
        }).catch((err)=>{
            return err;
        })
    }
});

