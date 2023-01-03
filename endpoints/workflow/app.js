angular.module('rocketbotApp',[])
.controller('MainController', function($timeout, $scope, $http){
    $timeout(function () {
        $(".loader-wrap ").fadeOut(10);
    }, 100);
    $scope.commands = JSON.parse(robot[0].data)
    $scope.list_ids = list_id
    $scope.tree =commands.commands;
    $scope.item_viewing = {}
    $scope.item_comands = []
    $scope.modules = modules

    $scope.findCommand = function(id, commands){
        let comm = null
        for(let c of commands){
            if (c.father == "evaluateIf" || c.father == "for" || c.father == "evaluatewhile"){
                comm = $scope.findCommand(id, c.children)
                console.log(comm)
                if (comm == null){
                    comm = $scope.findCommand(id, c.else)
                }else{
                    return comm
                }
            }
            else if (c.id == id){
                console.log(c)
                return c
            }
        }
        return comm
    }
    $scope.view_item = function(){
        $scope.id = $scope.list_ids[name]
        console.log($scope.id)
        
        $scope.item_viewing = $scope.findCommand($scope.id, $scope.commands.project.commands)
        try{
            $scope.item_commands = JSON.parse($scope.item_viewing.command)
        }catch(e){
            $scope.item_commands  = {'command': $scope.item_viewing.command}
        }
    }

   



    // $scope.view = function(id){
    //     $("#" + id).toggle(100);
    // }
    // $scope.openNewWindow = function(){
    //     parent.open(location.href);
    // }
    // $scope.view_item = function(item){
    //     try{
    //         window.opener.postMessage({'type':'scrollTo', 'id':item.id})
    //     }catch(e){
    //         try{
    //             parent.postMessage({'type':'scrollTo', 'id':item.id})
    //         }catch(e){

    //         }
            
    //     }
    //     $scope.item_viewing = item
    //     $scope.item_commands = []
    //     $scope.item_commands_flat = ""
    //     try{
    //         $scope.item_commands = JSON.parse(item.command)
    //     }catch(e){
    //         $scope.item_commands  = {'command': item.command}
    //     }
    // }
    // $scope.getFatherData = function (parent) {
    //     var father = parent.father,
    //         group = parent.group;

    //     var gi = function (params) {
    //         if(!params){
    //             return []
    //         }
    //         var img = false;
    //         for (var t = 0; t < params.length; t++) {
    //             if (params[t].children && params[t].children.length > 0) {
    //                 img = gi(params[t].children);
    //                 if (img) {
    //                     return img;
    //                 }
    //             }
    //             if (params[t].else && params[t].children.length > 0) {
    //                 img = gi(params[t].else);
    //                 if (img) {
    //                     return img;
    //                 }
    //             }
    //         }

    //         for (var t = 0; t < params.length; t++) {
    //             if (params[t].father == father && params[t].group == group) {
    //                 return params[t];
    //             }
    //         }
    //     }
    //     var gi_modu = function (params, module_name, module_) {
    //         var img = false;
    //         for (var t = 0; t < params.length; t++) {
    //             if (params[t].children && params[t].children.length > 0) {
    //                 img = gi_modu(params[t].children, module_name, module_);
    //                 if (img) {
    //                     return img;
    //                 }
    //             }
    //         }

    //         for (var t = 0; t < params.length; t++) {
    //             if (params[t]['module_name'] == module_name && params[t]['module'] == module_) {
    //                 return params[t];
    //             }
    //         }
    //     }
    //     if (father == 'module' && group == 'scripts') {
    //         var data = JSON.parse(parent.command);

    //         var ret = gi_modu($scope.modules, data['module_name'], data['module'])
    //         //console.log("ret", ret)
    //         return ret;
    //     } else {
        
    //         var ret = gi($scope.tree);
    //         return ret
    //     }
    // }

    // $scope.exportToPdf = function(){
    //     //printJS('lista', 'html')
    //     window.print()
    // }
    
    
})

