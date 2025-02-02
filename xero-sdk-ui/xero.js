
Handlebars.getTemplate = function(name) {
    if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
        $.ajax({
            url : 'xero-sdk-ui/templates/' + name + '.handlebars',
            success : function(data) {
                if (Handlebars.templates === undefined) {
                    Handlebars.templates = {};
                }
                Handlebars.templates[name] = Handlebars.compile(data);
            },
            async : false
        });
    }
    return Handlebars.templates[name];
};

var endpoint = [
    {name: "Accounts",action:[{name: "Create"},{name: "Read"},{name: "Update"},{name: "Delete"},{name: "Archive"},{name: "Attachment"}]},
    {name: "BankTransactions",action:[{name: "Create"},{name: "Read"},{name: "Update"},{name: "Delete"}]},
    {name: "BankTransfers",action:[{name: "Create"},{name: "Read"}]},
    {name: "BrandingThemes",action:[{name: "Read"}]},
    {name: "Contacts",action:[{name: "Create"},{name: "Read"},{name: "Update"},{name: "Archive"}]},
    {name: "ContactGroups",action:[{name: "Create"},{name: "Read"},{name: "Update"},{name: "Archive"},{name:"AddContact"},{name:"RemoveContact"}]},
    {name: "CreditNotes",action:[{name: "Create"},{name: "Read"},{name: "Update"},{name: "Delete"},{name: "Allocate"},{name: "Refund"},{name: "Void"}]},
    {name: "Currencies",action:[{name: "Create"},{name: "Read"}]},
    {name: "Employees",action:[{name: "Create"},{name: "Read"},{name: "Update"}]},
    {name: "ExpenseClaims",action:[{name: "Create"},{name: "Read"},{name: "Update"}]},
    {name: "Invoices",action:[{name: "Create"},{name: "Read"},{name: "Update"},{name: "Delete"},{name: "Void"}]},
    {name: "InvoiceReminders",action:[{name: "Read"}]},
    {name: "Items",action:[{name: "Create"},{name: "Read"},{name: "Update"},{name: "Delete"}]},
    {name: "Journals",action:[{name: "Read"}]},
    {name: "LinkedTransactions",action:[{name: "Create"},{name: "Read"},{name: "Update"},{name: "Delete"}]},
    {name: "ManualJournals",action:[{name: "Create"},{name: "Read"},{name: "Update"}]},
    {name: "Organisations",action:[{name: "Read"}]},
    {name: "Overpayments",action:[{name: "Create"},{name: "Read"},{name: "Allocate"},{name: "Refund"}]},
    {name: "Payments",action:[{name: "Create"},{name: "Read"},{name: "Delete"}]},
    {name: "Prepayments",action:[{name: "Create"},{name: "Read"},{name: "Allocate"},{name: "Refund"}]},
    {name: "PurchaseOrders",action:[{name: "Create"},{name: "Read"},{name: "Update"},{name: "Delete"}]},
    {name: "Receipts",action:[{name: "Create"},{name: "Read"},{name: "Update"}]},
    {name: "RepeatingInvoices",action:[{name: "Read"}]},
    {name: "Reports",action:[{name: "TenNinetyNine"},{name: "AgedPayablesByContact"},{name: "AgedReceivablesByContact"},{name: "BalanceSheet"},{name: "BankSummary"},{name: "BudgetSummary"},{name: "ExecutiveSummary"},{name: "ProfitAndLoss"},{name: "TrialBalance"}]},
    {name: "TaxRates",action:[{name: "Create"},{name: "Read"},{name: "Update"}]},
    {name: "TrackingCategories",action:[{name: "Create"},{name: "Read"},{name: "Update"},{name: "Delete"},{name: "Archive"}]},
    {name: "TrackingOptions",action:[{name: "Create"},{name: "Update"},{name: "Delete"}]},
    {name: "Users",action:[{name: "Read"}]}];
    
function populateAction(currEndpoint,currAction) {
    for (var i = 0; i < endpoint.length; i++){
      if (endpoint[i].name == currEndpoint){
        temp = endpoint[i].action;
      }
    }
    $("#action").children().remove();

    for (var i = 0; i < temp.length; i++){
        if (temp[i].name == currAction)
        {
            var selected = 'selected="true"';
        } else {
            var selected = '';
        }

        $("#action").append('<option ' + selected + ' value="' + temp[i].name + '">' + temp[i].name + '</option>');
    }
}

function setArray(arr,match) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        if (arr[i].name === match) {
            arr[i].selected = "selected";
        }
    }
}

function loadGet(appName,logoutUrl,refreshUrl,currEndpoint,currAction) 
{

    setArray(endpoint,currEndpoint);     
   
    var template = Handlebars.getTemplate('container');
    var data = {name: appName,logoutUrl: logoutUrl, refreshUrl: refreshUrl};
    var html = template(data);
    document.querySelector("#req").innerHTML = html;    
    
    var template = Handlebars.getTemplate('options');
    var html = template(endpoint);
    document.querySelector("#endpoint").innerHTML = html;
 
    var action = [{name: "Create"},{name: "Read"},{name: "Update"},{name: "Delete"}];
   
    var html = template(action);
    document.querySelector("#action").innerHTML = html;

    populateAction(currEndpoint,currAction);

    $("#endpoint").on("change",function(){
        if(currAction != $("#action").val()) {
            currAction = $("#action").val();   
        }
        populateAction($("#endpoint").val(),currAction);
    });
}

function loadIndex(appName,requestTokenUrl) 
{
    var template = Handlebars.getTemplate('index');
    var data = {name: appName,requestTokenUrl: requestTokenUrl};
    var html = template(data);
    document.querySelector("#req").innerHTML = html;    
}
