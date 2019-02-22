/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * qrscan module
 */
define(['ojs/ojcore', 'knockout','qr/base64','viewModels/ojModuleTemp/t1','viewModels/ojModuleTemp/t2', 'viewModels/ojModuleTemp/t3', 'ojs/ojbutton','data/globData'
], function (oj, ko,Base64,t1 ,t2,t3) {
    /**
     * The view model for the main content view template
     */
    function qrscanContentViewModel() {
        var self = this;
        self.showResult = ko.observable(false);
        self.validResult =  ko.observable("");
        self.resultObj;
        self.currentModule = ko.observable("oj:blank");
        self.hashKey = ko.observable("");
        var cUserID;
        var credID;
        self.valueLog = ko.observable("查无此证");
        // For the best user experience, make sure the user is ready to give your app
        // camera access before you show the prompt. On iOS, you only get one chance.

        self.qrInit = function () {
            if (typeof (QRScanner) !== 'undefined') {
                //初始化检测，申请摄像头等权限
                QRScanner.prepare(onDone); // show the prompt
            } else {
                alert('插件加载失败');
            }
            function onDone(err, status) {
                if (err) {
                    console.error(err);
                }
                if (status.authorized) {
                    //绑定扫描监听
                    // `QRScanner.cancelScan()` is called.
                    QRScanner.scan(displayContents);
                    function displayContents(err, text) {
                        if (err) {
                            // an error occurred, or the scan was canceled (error code `6`)
                            alert('启动扫描出错：' + JSON.stringify(err));
                        } else {
                            // The scan completed, display the contents of the QR code:
                            QRScanner.hide(function (status) {

                                console.log(status);
                                self.resultObj = text;
                                self.getEachItems(text);
                            });
                        }
                    }
                    //开始扫描，需要将页面的背景设置成透明
                    QRScanner.show();

                } else if (status.denied) {
                    // The video preview will remain black, and scanning is disabled. We can
                    // try to ask the user to change their mind, but we'll have to send them
                    // to their device settings with `QRScanner.openSettings()`.
                    alert('用户拒绝访问摄像头');
                } else {
                    // we didn't get permission, but we didn't get permanently denied. (On
                    // Android, a denial isn't permanent unless the user checks the "Don't
                    // ask again" box.) We can ask again at the next relevant opportunity.
                }
            }
        }
        self.qrInit();



        self.getDetailedInfo = function(){
            //obj.credentialsId
            console.log(LocalURL + "/ynrsBlockChain/validateCredential.do?userId=" + userID + "&ciphertext=" + credID);
            $.ajax({
                type: "get",
                url: LocalURL + "/ynrsBlockChain/validateCredential.do?userId=" + userID + "&ciphertext=" + credID,
                beforeSend: function (XMLHttpRequest) {

                },
                success: function (data, textStatus) {


                    var newObj = JSON.parse(data);

                    if(newObj.resultMsg[0].ciphertext === ""){
                        self.showResult(true);
                        self.valueLog("查无此证");
                    }else{
                        console.log(newObj.resultMsg[0]);
                        self.bindHtml(newObj.resultMsg[0]);
                        self.hashKey(newObj.resultMsg[0].ciphertext);
                    }

                },

                complete: function (XMLHttpRequest, textStatus) {

                },
                error: function () {
                    alert("后台无效或hash值有误");
                }
            });
        }


        self.getEachItems = function (obj) {
            try{
                var result = Base64.decode(obj);

                console.log(result);
                var k = result.indexOf("&&");
                var daysVal = result.substring(5, k);

                var date = new Date();
                var today = date.getTime();

                console.log("today", today);
                console.log("read", parseInt(daysVal));


                if(today < parseInt(daysVal)){
                    self.validResult("1");
                }else{
                    self.validResult("");
                }

                console.log(self.validResult());
                var hashKey = result.substring(k+2);
                credID = Base64.encode(hashKey);
                console.log("hashKey" + hashKey);
                console.log("credID" + credID);
                self.getDetailedInfo();
            }catch(e){
                alert("二维码格式有误");
            }


        }

        // self.getEachItems("dGltZToxNTM5NzUxNzc1MjM5JiZhWms3UXdUT1VzZnM0S0ZzMVZxWmZ3PT0=");

        self.bindHtml = function(textObj){
            self.valueLog("有效");
            var newJ = textObj;
            glData = newJ;
            if(newJ.tempLocation === "t1"){
                self.currentModule("t1");
                t1.initWithValues();
            }else if(newJ.tempLocation === "t2"){
                self.currentModule("t2");
                t2.initWithValues();
            }else if(newJ.tempLocation === "t3"){
                self.currentModule("t3");
                t3.initWithValues();
            }else if(newJ.tempLocation === "t4"){
                // self.currentModule("t4");
                //                 // t4.initWithValues();
                alert("暂无此证");
            }
            self.showResult(true);
        }

        this.modulePath = ko.pureComputed(
            function ()
            {
                var name = self.currentModule();
                    return (name === 'oj:blank' ? name : 'ojModuleTemp/' + name);
            }
        );


        self.bbuttonClick = function () {
            oj.Router.rootInstance.go('dashboard');
        }

        self.scanbuttonClick = function () {
            QRScanner.show();
        };




// Make the webview transparent so the video preview is visible behind it.

// Be sure to make any opaque HTML elements transparent here to avoid
// covering the video.

    }
    return qrscanContentViewModel;
});
