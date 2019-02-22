var glData;

var userID = 1002;

// LocalURL = function(){
//     var tempURL = window.localStorage.getItem("HOST_URL");
//     if(tempURL !== null){
//         console.log(tempURL);
//         return tempURL;
//     }else{
//         var defaultURL = "http://heng-ge.cn:8080";
//         window.localStorage.setItem("HOST_URL",defaultURL);
//         return defaultURL;
//     }
// }

var LocalURL = window.localStorage.getItem("HOST_URL") ? window.localStorage.getItem("HOST_URL") : "http://heng-ge.cn:8080";

var currentCDS ;