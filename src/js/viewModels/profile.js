/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your profile ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojmodule-element-utils', 'ojs/ojarraydataprovider','viewModels/about', 'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojbutton','data/globData'],
        function (oj, ko, $, app, moduleUtils, ArrayDataProvider,about) {

            function ProfileViewModel() {
                var self = this;

                // Header Config
                self.headerConfig = ko.observable({'view': [], 'viewModel': null});
                moduleUtils.createView({'viewPath': 'views/header.html'}).then(function (view) {
                    self.headerConfig({'view': view, 'viewModel': new app.getHeaderModel()})
                })

                self.arrayData = ko.observableArray([])

                this.dataProvider = new ArrayDataProvider(self.arrayData, {'keyAttributes': 'id'});

                self.bbuttonClick = function () {
                    oj.Router.rootInstance.go('dashboard');
                }

                self.homebuttonClick = function () {
                    oj.Router.rootInstance.go('dashboard');
                }


                self.getInfoList = function () {
                    console.log(LocalURL);
                    $.ajax({
                        type: "get",
                        url: LocalURL + "/ynrsBlockChain/getCredentialsList.do?userId=" + userID,
                        beforeSend: function (XMLHttpRequest) {
                            
                        },
                        success: function (data, textStatus) {

                            var newObj = JSON.parse(data);
                            self.arrayData(newObj.resultMsg);
                            console.log(self.arrayData());
                        },

                        complete: function (XMLHttpRequest, textStatus) {

                        },
                        error: function () {
                            alert("后台API报错");
                        }
                    });
                }

                self.gotoDetail= function(data){
                    console.log(data);
                    if(data.credentialsName){
                        oj.Router.rootInstance.go('about');
                        about.titleName(data.credentialsName);
                        about.backTo("profile");
                        about.getDetailedInfo(data);
                    }
                }


                self.getInfoList();
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
            return new ProfileViewModel();
        }
);
