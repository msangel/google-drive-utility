var file;
function main() {
  file = findReport();
  Logger.log(file);
  var folders = DriveApp.getFolders();
  var totalSize = 0;
  while(folders.hasNext()){
    folders.next();
    totalSize++;
  }
  intLog('0/'+totalSize);
  var sheet = SpreadsheetApp.open(file).getActiveSheet();
  sheet.clear();
  sheet.appendRow(["Folder Name","Size in MB","Owner"]);
  folders = DriveApp.getFolders();
  var current = 0;
  while(folders.hasNext()) {
    var folder = folders.next();
    current++;
    processFolder(sheet, folder, current, totalSize);
  }
  return;
  
  var sheet = SpreadsheetApp.open(report).getActiveSheet();
  sheet.clear();
  
  return;
    var totalSize = 0;
    
    var driveReportFileItr = DriveApp.getFilesByName("Tree");
    var sheet;
    if(driveReportFileItr.hasNext()){
        sheet = SpreadsheetApp.open(driveReportFileItr.next()).getActiveSheet();
    }else{
        sheet = SpreadsheetApp.create("Google Drive Report").getActiveSheet();
    }
    sheet.clear();
    sheet.appendRow(["Folder Name","Size in MB","Owner"]);
    while(folders.hasNext())
     {
      var folderSize = 0;
      var folder = folders.next();
      var files = folder.getFiles();
      while(files.hasNext()){
         folderSize +=files.next().getSize();
      }
      folderSize = folderSize/(1024*1024);
      totalSize +=folderSize;
      if(folderSize > 1)
        sheet.appendRow(["=HYPERLINK(\""+folder.getUrl()+"\";\""+folder.getName()+"\")", folderSize.toFixed(2),folder.getOwner().getName()]);
      }
    var range = sheet.getRange(1, 1, sheet.getMaxRows(),2);
    range.sort({column: 2, ascending: false})
    sheet.appendRow(["Total Size",totalSize.toFixed(2)+" MB"]);
 }

var prefix = 'Google Drive Report'

function findReport(){
  var pattern = 'title contains "'+prefix+'"';
  var files = DriveApp.searchFiles(pattern);
  var file = null;
  if (files.hasNext()) {
    file = files.next();
  } else {
      SpreadsheetApp.create(prefix).getActiveSheet();
      files = DriveApp.searchFiles(pattern);
      if (files.hasNext()) {
        file = files.next();
      }
  }
  return file;
}

function intLog(str){
  file.setName(prefix+' '+ str);
  Logger.log(str);
}

function processFolder(sheet, folder, current, totalSize) {
  intLog(current+'/'+totalSize)
  getAllFIlesSizeInFolder()
  var subfolders = getAllSubfolders();
  // https://stackoverflow.com/questions/50225563/how-can-i-group-rows-via-the-google-sheets-api
}
