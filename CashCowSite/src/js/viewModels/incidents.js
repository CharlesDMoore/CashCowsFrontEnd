
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojarraydataprovider', 'ojs/ojknockout', 'ojs/ojinputtext', 'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojlabel'],
function(oj, ko, $, ArrayDataProvider)
{   
  function viewModel()
  {
    var self = this;

    var deptArray = [
        {DepartmentId: 10, DepartmentName: 'Administration', LocationId: 200, ManagerId: 300},
        {DepartmentId: 20, DepartmentName: 'Marketing', LocationId: 200, ManagerId: 300},
        {DepartmentId: 30, DepartmentName: 'Purchasing', LocationId: 200, ManagerId: 300},
        {DepartmentId: 40, DepartmentName: 'Human Resources', LocationId: 200, ManagerId: 300},
        {DepartmentId: 50, DepartmentName: 'Accounting', LocationId: 200, ManagerId: 300},
        {DepartmentId: 60, DepartmentName: 'Operations', LocationId: 200, ManagerId: 300},
        {DepartmentId: 70, DepartmentName: 'Engineering', LocationId: 200, ManagerId: 300},
        {DepartmentId: 80, DepartmentName: 'Production', LocationId: 200, ManagerId: 300},
        {DepartmentId: 90, DepartmentName: 'Sales', LocationId: 200, ManagerId: 300},
        {DepartmentId: 100, DepartmentName: 'Customer Service', LocationId: 200, ManagerId: 300}];
    self.deptObservableArray = ko.observableArray(deptArray);
    self.dataprovider = new ArrayDataProvider(self.deptObservableArray, {keyAttributes: 'DepartmentId'});
    
    //add to the observableArray
    self.addRow = function()
    {
       var dept = {
                     'DepartmentId': self.inputDepartmentId(),
                     'DepartmentName': self.inputDepartmentName(),
                     'LocationId': self.inputLocationId(),
                     'ManagerId': self.inputManagerId()
                  };
        self.deptObservableArray.push(dept);
    };
    
    //used to update the fields based on the selected row
    self.updateRow = function()
    {
        var element = document.getElementById('table');
        var currentRow = element.currentRow;
        
        if (currentRow != null)
        {
            self.deptObservableArray.splice(currentRow['rowIndex'], 1, {
                         'DepartmentId': self.inputDepartmentId(),
                         'DepartmentName': self.inputDepartmentName(),
                         'LocationId': self.inputLocationId(),
                         'ManagerId': self.inputManagerId()
                      });
        }
    };
    
    //used to remove the selected row
    self.removeRow = function()
    {
        var element = document.getElementById('table');
        var currentRow = element.currentRow;

        if (currentRow != null)
        {
            self.deptObservableArray.splice(currentRow['rowIndex'], 1);
        }
    };
    
    //intialize the observable values in the forms
    self.inputDepartmentId = ko.observable();
    self.inputDepartmentName = ko.observable();
    self.inputLocationId = ko.observable();  
    self.inputManagerId = ko.observable();
    self.currentRowListener = function(event)
    {  
      var data = event.detail;  
      if (event.type == 'currentRowChanged' && data['value'] != null)  
      {  
        var rowIndex = data['value']['rowIndex'];  
        var dept = self.deptObservableArray()[rowIndex];  
        self.inputDepartmentId(dept['DepartmentId']);  
        self.inputDepartmentName(dept['DepartmentName']);  
        self.inputLocationId(dept['LocationId']);  
        self.inputManagerId(dept['ManagerId']);  
      }  
    }; 
  }
  var vm = new viewModel;
  
  $(document).ready
  (
    function()
    {
      ko.applyBindings(vm, document.getElementById('tableDemo'));
      var table = document.getElementById('table');
      table.addEventListener('currentRowChanged', vm.currentRowListener);
    }
  );
});	

