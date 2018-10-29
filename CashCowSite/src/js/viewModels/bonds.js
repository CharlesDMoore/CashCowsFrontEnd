/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojlabel',
    'ojs/ojknockout', 'ojs/ojinputtext', 'ojs/ojformlayout', 'ojs/ojdatetimepicker', 'ojs/ojinputnumber'],
        function (oj, ko, $) {

            

            let ret = false;
            let interestRate = .1;
            const url = "http://129.150.121.253:8091/bond/new";
            function createBond(newTaxable, newSymbol, newCouponRate, newCallAmount, newMaturity, newMaturityAmount, newPurchaseDate, newCallDate,
                    newPaymentDay, newPaymentMonth) {
                $.ajax({
                    type: 'POST',
                    url: url,
                    data: JSON.stringify({"taxable": newTaxable, "symbol": newSymbol, "coupon_rate": newCouponRate,
                        "pmt_day": newPaymentDay, "pmt_month": newPaymentMonth, "call_date": newCallDate, "call_amount": newCallAmount, "maturity": newMaturity, "maturity_amount": newMaturityAmount,
                       "purchase_date": newPurchaseDate}),
                    dataType: 'json',
                    contentType: 'application/json',

                    beforeSend: function (msg) {
                        //msg.setRequestHeader("Authorization", "Basic " + btoa(bcs_user + ':' + bcs_pwd));
                    },
                    success: function (msg) {
                        console.log(msg);
                        if (parseInt(msg) != 0)
                        {
                            if (msg.returnCode == 'Success') {
                                app.setPageID('bonds');
                                app.gotoBonds();
                                ret = true;
                            } else if (msg.returnCode == 'Failed') {
                                alert('Bond post failed - ' + msg.info);
                            } else {
                                alert('Bond created!');
                            }
                        } else {
                            console.log('success but no response');
                        }
                    },
                    failure: function (jqXHR, textStatus, errorThrown) {
                        console.log(textStatus);
                        alert('Post Failed: ' + textStatus);
                    }
                });
                return ret;
            }
            
            const delUrl1 = "http://129.150.121.253:8091/bond/";
            const delUrl2 = "/delete"
            function deleteBond(id){
                $.ajax({
                    type: 'GET',
                    url: delUrl1 + id + delUrl2,

                    beforeSend: function (msg) {
                        //msg.setRequestHeader("Authorization", "Basic " + btoa(bcs_user + ':' + bcs_pwd));
                    },
                    success: function (msg) {
                        console.log(msg);
                        if (parseInt(msg) != 0)
                        {
                            if (msg.returnCode == 'Success') {
                                app.setPageID('bonds');
                                app.gotoBonds();
                                ret = true;
                            } else if (msg.returnCode == 'Failed') {
                                alert('Bond post failed - ' + msg.info);
                            } else {
                                alert('Bond deleted!');
                                app.setPageID('bonds');
                                app.gotoBonds();
                            }
                        } else {
                            console.log('success but no response');
                        }
                    },
                    failure: function (jqXHR, textStatus, errorThrown) {
                        console.log(textStatus);
                        alert('Post Failed: ' + textStatus);
                    }
                });
                return ret;
            }
            
            function updateBond(newId, newTaxable, newSymbol, newCouponRate, newCallAmount, newMaturity, newMaturityAmount, newPurchaseDate, newCallDate,
                    newPaymentDay, newPaymentMonth){
                $.ajax({
                    type: 'PUT',
                    url: url,
                    data: JSON.stringify({"taxable": newTaxable, "symbol": newSymbol, "coupon_rate": newCouponRate,
                       "call_amount": newCallAmount, "maturity": newMaturity, "maturity_amount": newMaturityAmount,
                       "purchase_date": newPurchaseDate, "call_date": newCallDate, "pmt_day": newPaymentDay, "pmt_month": newPaymentMonth}),
                    dataType: 'json',
                    contentType: 'application/json',

                    beforeSend: function (msg) {
                        //msg.setRequestHeader("Authorization", "Basic " + btoa(bcs_user + ':' + bcs_pwd));
                    },
                    success: function (msg) {
                        console.log(msg);
                        if (parseInt(msg) != 0)
                        {
                            if (msg.returnCode == 'Success') {
                                app.setPageID('bonds');
                                app.gotoBonds();
                                ret = true;
                            } else if (msg.returnCode == 'Failed') {
                                alert('Bond post failed - ' + msg.info);
                            } else {
                                alert('Bond post failed - Please check with App Admin');
                            }
                        } else {
                            console.log('success but no response');
                        }
                    },
                    failure: function (jqXHR, textStatus, errorThrown) {
                        console.log(textStatus);
                        alert('Post Failed: ' + textStatus);
                    }
                });
                return ret;
            }

            // START VIEW MODEL=========================================================START VIEW MODEL
            function BondsViewModel() {
                var self = this;
                
                this.startAnimationListener = function (event)
                {
                    var element = document.getElementById('table1');
                    var currentRow = element.currentRow;

                    if (currentRow != null)
                    {
                        self.newTaxable(myArray[currentRow['rowIndex']].taxable);
                        self.newSymbol(myArray[currentRow['rowIndex']].symbol);
                        self.newCouponRate(myArray[currentRow['rowIndex']].coupon_rate);
                        var pmtDateString = (myArray[currentRow['rowIndex']].coupon_rate);
                        var pmtDateArray = pmtDateString.split("-")
                        self.newPaymentDay(myArray[currentRow['rowIndex']].pmtDateArray[0].trim())
                        self.newPaymentMonth(myArray[currentRow['rowIndex']].pmtDateArray[1].trim());
                        self.newCallDate(myArray[currentRow['rowIndex']].call_date);
                        self.newCallAmount(myArray[currentRow['rowIndex']].call_amount);
                        self.newMaturity(myArray[currentRow['rowIndex']].maturity);
                        self.newMaturityAmount(myArray[currentRow['rowIndex']].maturity_amount);
                        self.newPurchaseDate(myArray[currentRow['rowIndex']].purchase_date);
                        //alert("Setting bond to modal: " + myArray[currentRow['rowIndex']].id);
                        
                    }
                    
                    var ui = event.detail;
                    if (event.target.id !== "popup1")
                        return;

                    if ("open" === ui.action)
                    {
                        event.preventDefault();
                        var options = {"direction": "top"};
                        oj.AnimationUtils.slideIn(ui.element, options).then(ui.endCallback);
                    } else if ("close" === ui.action)
                    {
                        event.preventDefault();
                        ui.endCallback();
                    }
                }.bind(this);
                this.openListener = function (event)
                {
                    var popup = document.getElementById('popup1');
                    popup.open('#btnGo');
                }.bind(this);
                this.cancelListener = function (event)
                {
                    var popup = document.getElementById('popup1');
                    popup.close();
                }.bind(this);

                self.newTaxable = ko.observable("");
                self.newSymbol = ko.observable("");
                self.newCouponRate = ko.observable("");
                self.newPaymentDay = ko.observable("");
                self.newPaymentMonth = ko.observable("");
                self.newCallDate = ko.observable("");
                self.newCallAmount = ko.observable("");
                self.newMaturity = ko.observable("");
                self.newMaturityAmount = ko.observable("");
                self.newPurchaseDate = ko.observable("");

                // ==========================CREATE A BOND
                self.newBond = function () {
                    createBond(self.newTaxable(), self.newSymbol(), self.newCouponRate(), 
                    self.newCallAmount(), self.newMaturity(),
                    self.newMaturityAmount(), self.newPurchaseDate(), self.newCallDate(),
                    self.newPaymentDay(), self.newPaymentMonth());
                    //self.loginSuccess();
                }
                
                // ==========================UPDATE A BOND
                self.updateBond = function () {
                    updateBond(self.newTaxable(), self.newSymbol(), self.newCouponRate(), 
                    self.newCallAmount(), self.newMaturity(),
                    self.newMaturityAmount(), self.newPurchaseDate(), self.newCallDate(),
                    self.newPaymentDay(), self.newPaymentMonth());
                    //self.loginSuccess();
                }
                
                // ===========================DELETE A BOND
                deleteBondId = 0;
                self.currentRowListener = function(event)
                {
                    var info = event.detail;
                    if (event.type == 'currentRowChanged' && info['value'] != null)
                    {
                        var rowIndex = info['value']['rowIndex'];
                        var bondSelection = self.data()[rowIndex];
                        vm.inputDepartmentId(bondSelection['ID']);
                        vm.inputDepartmentId(dept['DepartmentId']);
                    }
                };
                
                self.removeRow = function ()
                {
                    var element = document.getElementById('table1');
                    var currentRow = element.currentRow;

                    if (currentRow != null)
                    {
                        
                    }
                };
                
                // =========================HIDE/SHOW ADD AND UPDATE BOND
                self.showNewBond = ko.observable(false);
                self.toggleVisibility = function () {

                    self.showNewBond(!self.showNewBond());
                    //alert('New Bond is ready: ' + self.showNewBond());
                };

                // Determine the number of years between now and maturity
                function dateDiff(dateold, datenew)
                {
                    var ynew = datenew.getFullYear();
                    var mnew = datenew.getMonth();
                    var dnew = datenew.getDate();
                    var yold = dateold.getFullYear();
                    var mold = dateold.getMonth();
                    var dold = dateold.getDate();
                    var diff = ynew - yold;
                    if (mold > mnew)
                        diff--;
                    else
                    {
                        if (mold == mnew)
                        {
                            if (dold > dnew)
                                diff--;
                        }
                    }
                    return diff;
                }

                // JESUS LORD FIND A BETTER WAY CHARLEZ
                myArray = [];
                $.getJSON("http://129.150.121.253:8091/").
                        then(function (users) {
                            $.each(users, function () {
                                myArray.push({
                                    id: this._id,
                                    taxable: this.taxable,
                                    symbol: this.symbol,
                                    coupon_rate: this.coupon_rate,
                                    pmt_date: this.pmt_month + "-" + this.pmt_day,
                                    call_date: this.call_date, //.split('T')[0],
                                    call_amount: this.call_amount,
                                    maturity: this.maturity, //.split('T')[0],
                                    maturity_amount: this.maturity_amount,
                                    purchase_date: this.purchase_date, //.split('T')[0],
                                    market_price: "$" + Math.round(((this.maturity_amount * this.coupon_rate)
                                            * (1 - (1 / Math.pow((1 + interestRate), 5)))
                                            * (this.maturity_amount / Math.pow((1 + interestRate), 5))) * 100) / 100,
                                    current_yield: Math.round((((this.maturity_amount * this.coupon_rate) /
                                            ((this.maturity_amount * this.coupon_rate)
                                                    * (1 - (1 / Math.pow((1 + interestRate), 5)))
                                                    * (this.maturity_amount / Math.pow((1 + interestRate), 5))))
                                            * 100) * 100) / 100 + "%"
                                });
                            });
                        });
                
                

                // IMPORTANT: Bond years is hardcoded right now
                // =============================POPULATE TABLE
                self.data = ko.observableArray();
                $.getJSON("http://129.150.121.253:8091/").
                        then(function (users) {
                            $.each(users, function () {
                                self.data.push({
                                    id: this._id,
                                    taxable: this.taxable,
                                    symbol: this.symbol,
                                    coupon_rate: this.coupon_rate,
                                    pmt_date: this.pmt_month + "-" + this.pmt_day,
                                    call_date: this.call_date, //.split('T')[0],
                                    call_amount: this.call_amount,
                                    maturity: this.maturity, //.split('T')[0],
                                    maturity_amount: this.maturity_amount,
                                    purchase_date: this.purchase_date, //.split('T')[0],
                                    market_price: "$" + Math.round(((this.maturity_amount * this.coupon_rate)
                                            * (1 - (1 / Math.pow((1 + interestRate), 5)))
                                            * (this.maturity_amount / Math.pow((1 + interestRate), 5))) * 100) / 100,
                                    current_yield: Math.round((((this.maturity_amount * this.coupon_rate) /
                                            ((this.maturity_amount * this.coupon_rate)
                                                    * (1 - (1 / Math.pow((1 + interestRate), 5)))
                                                    * (this.maturity_amount / Math.pow((1 + interestRate), 5))))
                                            * 100) * 100) / 100 + "%"
                                });
                            });
                        });

                self.dataSource = new oj.ArrayTableDataSource(
                        self.data,
                        {idAttribute: 'id'}
                );
        
                

//                self.currentRowListener = function (event)
//                {
//                    var data = event.detail;
//                    if (event.type == 'currentRowChanged' && data['value'] != null)
//                    {
//                        var rowIndex = data['value']['rowIndex'];
//                        var dept = self.data()[rowIndex];
//                        
//                    }
//                };  

                // Populate the modal
                self.populateModal = function ()
                {
                    var element = document.getElementById('table1');
                    var currentRow = element.currentRow;

                    if (currentRow != null)
                    {
                        self.newTaxable(myArray[currentRow['rowIndex']].taxable)
                        
                        //alert("Setting bond to modal: " + myArray[currentRow['rowIndex']].id);
                        
                    }
                };

                //used to remove the selected row
                self.removeRow = function ()
                {
                    var element = document.getElementById('table1');
                    var currentRow = element.currentRow;

                    if (currentRow != null)
                    {
                        
                        
                        alert("Deleting bond: " + myArray[currentRow['rowIndex']].id);
                        deleteBond(myArray[currentRow['rowIndex']].id)
                    }
                };
                

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
            
            return new BondsViewModel();


        }


);
