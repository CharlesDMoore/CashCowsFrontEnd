/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojtable', 'ojs/ojarraytabledatasource'],
 function(oj, ko, $) {
  
    function CustomerViewModel() {
      var self = this;
      
      self.data = ko.observableArray();
        $.getJSON("https://f045be61.ngrok.io/bonds").
            then(function (users) {
                $.each(users, function() {
                    self.data.push({
                        id: this.id,
                        taxable: this.Taxable,
                        symbol: this.Symbol,
                        coupon_rate: this.Coupon_Rate,
                        pmt_date: this.pmt_month + "-" + this.pmt_Day,
                        call_date: this.Call_Date.split('T')[0],
                        call_amount: this.Call_Amount,
                        maturity: this.Maturity,
                        maturity_amount: this.Maturity_Amount,
                        purchase_date: this.Purchase_Date
                    });
                });
            });
            
      self.dataSource = new oj.ArrayTableDataSource(
            self.data,
            {idAttribute: 'id'}
        );
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
      self.connected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new CustomerViewModel();
  }
);
