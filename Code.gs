// automated notification system
// Date: Feburaury 2024
// Author: Jesse Bethke
// Code sourced from another project created by Sam Stubbs. Modified his project to fit a different request.

function doGet(e) {
  return HtmlService.createTemplateFromFile('Form').evaluate();
}

function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getStaffNames() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var nameSheet = ss.getSheetByName("TeacherNames");
  var getLastRow = nameSheet.getLastRow();
  var returnData = nameSheet.getRange(2,1, getLastRow - 1, 1).getValues();
  return returnData;
}

function AddRecord(staffName, location, notes)
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var autoCompleteSheet = ss.getSheetByName('Responses')
  autoCompleteSheet.appendRow([Utilities.formatDate(new Date(), "CST", "yyyy-MM-dd hh:mm:ss"), staffName, location, notes]);
}

function startForm()
{
  var form = HtmlService.createHtmlOutputFromFile('Form');
}

function addMenu()
{
  var menu = SpreadsheetApp.getUi().createMenu('Custom');
  menu.addItem('Option Form', 'startForm');
  menu.addToUi();
}

function onOpen(e)
{
  addMenu();
}

function getCustodianData(Data) {
  var data = SpreadsheetApp.getActive().getSheetByName('Custodian').getDataRange().getValues();
  return data;
}

function getData(Data) {
  var data = SpreadsheetApp.getActive().getSheetByName('Data').getDataRange().getValues();
  return data;
}

function sendEmails() {
  try{
  var custodianData = getCustodianData("Custodian");
  var templateData = getData("Data");
  var custodian = custodianData[1][3];
  var blind = "jherrington@bentonvillek12.org"

  var emailBody = templateData[12][4]; 
  var emailSubject = templateData[11][5];

  GmailApp.sendEmail(custodian, emailSubject, emailBody,
  {
    name: "Cleaning Request",
    bcc: blind,
    noReply: true,
    
  });
  }

  catch(err)
  {
    error();
  }

}

function error(){
    var templateData = getCustodianData("Custodian");
    var custodian = templateData[0][1];
    var combined = "The email for " + custodian +  " could not be found. An email has not been sent."
  var errorMessage = {
    to: advo,
    cc: "jbethke@bentonvillek12.org",
    subject: "Cleaning Request Failure",
    body: combined,
    name: "Cleaning Request",
    noReply: true,
  }
    MailApp.sendEmail(errorMessage);
}


function nowUpdate()
{
 var sheet = SpreadsheetApp.getActive();
 var sheet1 = sheet.getSheetByName('TeacherNames');
  
  var sheet1range = sheet1.getRange("W1")
  sheet1range.clear()
  debugger
}

function createTimeTriggerAtSpecificHourMinute() {
 ScriptApp.newTrigger("nowUpdate")
   .timeBased()
   .everyMinutes(30)
   .create();
}