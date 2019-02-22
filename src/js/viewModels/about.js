/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojmodule-element-utils', 'qrcode','qr/base64', 'viewModels/ojModuleTemp/t1','viewModels/ojModuleTemp/t2', 'viewModels/ojModuleTemp/t3','ojs/ojbutton', 'ojs/ojpopup', 'ojs/ojmodule','data/globData'],
        function (oj, ko, $, app, moduleUtils, qrcode,Base64, t1,t2,t3) {

            function AboutViewModel() {
                var self = this;
                self.currentModule = ko.observable("t2");
                self.titleName= ko.observable("我是中介机构");
                self.backTo= ko.observable("dashboard");
                self.experTimer = ko.observable("有效截止至：");
                // Header Config
                self.headerConfig = ko.observable({'view': [], 'viewModel': null});
                moduleUtils.createView({'viewPath': 'views/header.html'}).then(function (view) {
                    self.headerConfig({'view': view, 'viewModel': new app.getHeaderModel()});
                })
                self.currentData;
                self.currentCredentialsId;
                self.currentHashKey;

                this.modulePath = ko.pureComputed(
                        function ()
                        {
                            var name = self.currentModule();
                            return (name === 'oj:blank' ? name : 'ojModuleTemp/' + name);
                        }
                );

                self.getDetailedInfo = function(obj){
                    console.log("about" + obj);
                    //obj.credentialsId
                    $.ajax({
                        type: "get",
                        url: LocalURL + "/ynrsBlockChain/getCredentialInfoById.do?userId=" + userID + "&credentialsId=" + obj.credentialsId + "&credentialsTypeId=" + obj.credentialsTypeId,
                        beforeSend: function (XMLHttpRequest) {

                        },
                        success: function (data, textStatus) {
                            var newObj = JSON.parse(data);
                            self.currentData = JSON.stringify(newObj.resultMsg[0].credentialsInfo);
                            self.currentCredentialsId = obj.credentialsId;
                            self.currentHashKey = newObj.resultMsg[0].ciphertext;
                            console.log("hashshs" + self.currentHashKey );
                            glData = newObj.resultMsg[0];
                            self.currentModule(newObj.resultMsg[0].tempLocation);
                            console.log("is " + self.currentModule() + JSON.stringify(glData));
                            if(self.currentModule() === "t2"){
                                t2.initWithValues();
                            }else if(self.currentModule() === "t1"){
                                t1.initWithValues();
                            }else if(self.currentModule() === "t3") {
                                t3.initWithValues();
                            }else{
                                alert("暂无此模版");
                            }
                        },

                        complete: function (XMLHttpRequest, textStatus) {

                        },
                        error: function () {
                            alert("后台API报错");
                        }
                    });
                }

                self.sbuttonClick = function (text) {

                }

                self.bbuttonClick = function () {
                    oj.Router.rootInstance.go(self.backTo());
                }

                self.homebuttonClick = function () {
                    oj.Router.rootInstance.go('dashboard');
                }

                function timestampToTime(timestamp) {
                    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                    var Y = date.getFullYear() + '-';
                    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                    var D = date.getDate() + ' ';
                    var h = date.getHours() + ':';
                    var m = date.getMinutes() + ':';
                    var s = date.getSeconds();
                    return Y + M + D + h + m + s;
                }


                self.shareQR = function (event) {
                    console.log("creatting");
                    $("#qrcode").empty();
                    var cD = event.currentTarget.id;
                    var date = new Date();
                    var today = date.getTime();
                    var shareDay = today + (86400000 * cD);
                    var textObj = "time:" + shareDay + "&&" + self.currentHashKey;
                    var aWords = "有效截止至：" + timestampToTime(shareDay);
                    self.experTimer(aWords);
                    console.log(textObj);
                    console.log(timestampToTime(shareDay));


                    var result = Base64.encode(textObj);
                    console.log("result" + result);
                    self.qrOptsDt = {
                        size: 160,
                        text: result,
                        render: 'div'
                    }

                    $("#qrcode").qrcode(self.qrOptsDt);

                    document.querySelector('#popup1').open('#popView');
                }


                // Below are a set of the ViewModel methods invoked by the oj-module component.
                // Please reference the oj-module jsDoc for additional information.

                /**
                 * Optional ViewModel method invoked after the View is inserted into the
                 * document DOM.  The application can put logic that requires the DOM being
                 * attached here. 
                 * This method might be called multiple times - after the View is created 
                 * and inserted into the DOM and after the View is reconnected 
                 * after being disconnected.
                 */
                self.connected = function () {
                    // Implement if needed
                };

                /**
                 * Optional ViewModel method invoked after the View is disconnected from the DOM.
                 */
                self.disconnected = function () {
                    // Implement if needed
                };

                /**
                 * Optional ViewModel method invoked after transition to the new View is complete.
                 * That includes any possible animation between the old and the new View.
                 */
                self.transitionCompleted = function () {
                    // Implement if needed
                };
            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constructed
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new AboutViewModel();
        }
);
