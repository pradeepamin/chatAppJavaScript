app.controller('controllerChat', function ($scope, getUserService, SocketService) {
    console.log('get user controller called...');
    $scope.msgData = []
    $scope.getUser =  ($scope) =>{
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
        console.log("send msg data--", sendMsgData)        
        SocketService.emit("newMsg", sendMsgData);
        $scope.msgData.push(sendMsgData);
        }
        /**
         * listining event
         */
        var senderId = localStorage.getItem('loginId');
        SocketService.on(senderId, function (message) {
            console.log(" message emitted from server ----->", message);    
            if (localStorage.getItem('receiverId') == message.to) {
                if ($scope.msgData === undefined) 
                {
                    $scope.msgData = message;//assighning message to variable
                }
                else {
                    $scope.msgData.push(message);
                    console.log("  in else--->  ",$scope.msgData);
                }
            }
        })

        /**
         * to clear input texr area
         */
        $scope.clearTextArea = function () {
            console.log('in clear test area');
            $scope.msg = '';
        }

        $scope.logout = function () {
            $location.path('/login');
        }

    });












// (function () {
//     var app = angular.module('myApp');

//     app.controller('controllerChat', function ( $scope, chatService) {

//     console.log('get user called...');
//     $scope.msgData = []

//     $scope.getUser = function ($scope) {
//         chatService.getUserServiceData($scope);
//     }
//     $scope.getUser($scope);

/**
  //  * @description:to call getalluser templates as on the request
  //  * @param:$scope
  // //  */
        // $scope.firstName=localStorage.getItem('firstName');

        // chatService.getUser().then(function successCallBack(response) {
        //     $scope.allUsers = response.data.filter((friendsId) => {
        //         console.log("Frieds id",friendsId);
        //         return $scope.firstName!=friendsId.firstName;
        //     });
        // },
        //     function errorCallBack(error) {
        //         $scope.value = "user register not done..";
        //         console.log("get all user fail res-->", error);
        //     });


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

        // $scope.person = (user) => {
        //     // $scope.receiverId = receiverEmail;
        //     console.log("in person-->",user);            
        //     chatService.getMsg($scope).then(function successCallBack(response){  
        //         console.log("response in person-->",response);       
        //         let msgArr = [];                      
        //         msgs=response.data;

        //         if( (senderId == list.senderId && receiverId == list.receiverId) 
        //             || senderId == list.receiverId && receiverId == list.senderId)
        //         {
        //             msgArr.push(list);                    
        //             // console.log("msgArr--",msgArr)
        //         }
        //         $scope.msgData = msgArr;


        //         console.log("Scope mesages+++++",$scope.msgs)
        //         SocketService.emit("updatedlist in service",response.data)
        //         console.log("MESSGAEES******",msgs)
        //     },
        //     function errorCallBack(error){
        //         $scope.value="no user register";
        //         console.log("failed",error);
        //     }
        //     );
        // }


        // $scope.logout = () => {
        //     try {
        //         localStorage.clear();
        //         chatService.logout();
        //     } catch (e) {
        //         console.log(e);
        //     }
        // }
//     });

// })();
