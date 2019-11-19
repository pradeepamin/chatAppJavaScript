
app.controller('controllerChat',function($scope, chatService,SocketService){

    chatService.getUserName($scope);
    chatService.getUsers($scope);

    $scope.storeMsg=()=>{
        console.log("controler in store msg");
        let msgBoth=JSON.parse(localStorage.getItem('chat'));
        console.log("data storeMsg email...",msgBoth);
        var data={
            "from":$scope.userEmail,
            "to":msgBoth.to,
            "msg":$scope.msg1
        }
    SocketService.emit("Storemsg",data);
    SocketService.on("update data",(data)=>{
        $scope.msg.push(data)
    })
    }

    $scope.person=(value)=>{
        $scope.value=value;
        console.log("scope value",$scope.value);
        chatService.getUserMsg($scope,value);
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