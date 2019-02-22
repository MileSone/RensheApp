/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojmodule-element-utils','viewModels/profile','viewModels/about', 'ojs/ojbutton','data/globData'],
        function (oj, ko, $, app, moduleUtils,profile,about) {

            function DashboardViewModel() {
                var self = this;
                self.userInfo = ko.observable();
                self.isOrg = ko.observable("");
                // Header Config
                self.headerConfig = ko.observable({'view': [], 'viewModel': null});
                moduleUtils.createView({'viewPath': 'views/header.html'}).then(function (view) {
                    self.headerConfig({'view': view, 'viewModel': new app.getHeaderModel()});
                })
                self.sbuttonClick = function (event) {
                    self.clickedButton(event.currentTarget.id);
                    return true;
                }

                self.ZJaction = function () {
                    self.getZJApi();
                }
                self.CYaction = function () {
                    oj.Router.rootInstance.go('qrscan');
                }
                self.ZZaction = function () {
                    oj.Router.rootInstance.go('profile');
                    profile.getInfoList();
                }
                self.LOaction = function () {
                    oj.Router.rootInstance.go('login');
                }

                self.STaction = function () {
                    oj.Router.rootInstance.go('settings');
                }


                self.getZJApi = function(){
                        $.ajax({
                            type: "get",
                            url: LocalURL + "/ynrsBlockChain/getCredentialsList.do?userId=" + userID,
                            beforeSend: function (XMLHttpRequest) {

                            },
                            success: function (data, textStatus) {
                                var newObj = JSON.parse(data);
                                console.log(newObj);
                                currentCDS = newObj.resultMsg[0];
                                oj.Router.rootInstance.go('about');
                                about.titleName();
                                about.backTo("dashboard");
                                about.currentModule("t3");
                                about.getDetailedInfo(currentCDS);
                            },

                            complete: function (XMLHttpRequest, textStatus) {

                            },
                            error: function () {

                            }
                        });
                }
//qrcode.clear(); // 清除代码
//qrcode.makeCode("http://www.w3cschool.cc"); // 生成另外一个二维码
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
            return new DashboardViewModel();
        }
);