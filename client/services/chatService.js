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






// (function () {

//     const app = angular.module('myApp');
//     /**
//         * @description:to call getusername templates as on the request
//         * @param:$scope
//         */

//     app.service("chatService", function ($http, $location) {

//         this.getUserServiceData = function ($scope) {
//             console.log("data in service--", $scope);

//             var token = localStorage.getItem('logintoken');
//             console.log("token---", token);

//             return $http({
//                 method: 'GET',
//                 url: 'http://localhost:3000/getUsers'
//             }).then(function (response) {          

//                 console.log("response in getAllUsers server---", response);

//                 if (response.data.success === true) {
//                     console.log("service data---", response.data.result);
//                     $scope.currUser = localStorage.getItem('loginuser');
//                     $scope.currUserId = localStorage.getItem('loginId');
//                     $scope.userData = response.data.result;
//                 } else {               
//                     console.log(response);  
//                     $location.path('/login');              
//                 }    
//             }).catch(function (error) {
//                 $location.path('/login');
//                 alert('failed...');
//                 console.log('failed ...', error);
//             });
//         }




    //     this.getUser = function () {
    //         console.log("service in getAllUser");
    //         return $http({
    //             method: 'GET',
    //             url: 'http://localhost:3000/getUsers'
    //         });
    //     }
    //     /**
    //    * @description:to call getusermsg templates as on the request
    //    * @param:$scope,value
    //    */
    //     this.getMsg = function ($scope) {
    //         return $http({
    //             method: "GET",
    //             url: 'http://localhost:3000/getMsg'
    //         }).then(function sucessCallback(response) {
    //             console.log("RESPONSE---------*********", response);
    //             $scope.msgs = response.data;
    //         },
    //             function errrCallback(response) {
    //                 // $scope.value = "No users registred.. ";
    //                 console.log("fetch UnSucessFull ===>", response);
    //             })
    //     }




//     })
// })();
