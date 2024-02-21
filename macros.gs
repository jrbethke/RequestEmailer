function Reset() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('B2:B34').activate();
  spreadsheet.getActiveRangeList().check();
};

function Reset1() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('B2:B64').activate();
  spreadsheet.getActiveRangeList().uncheck();
};