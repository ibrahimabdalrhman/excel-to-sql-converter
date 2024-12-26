const XLSX = require('xlsx');
const fs = require('fs');

// Specify the path to your Excel file
const excelFilePath = "D:\\learnsql\\convertToSql\\surah2.xlsx"; // Use double backslashes

// Read the Excel file
const workbook = XLSX.readFile(excelFilePath);

// Get the first sheet name
const sheetName = workbook.SheetNames[0];

// Get the worksheet
const worksheet = workbook.Sheets[sheetName];

// Convert the worksheet to JSON
const jsonData = XLSX.utils.sheet_to_json(worksheet);

// Save the JSON data to a file
const jsonOutputPath = 'outputOfExcel.json'; // Replace with your desired output file name
fs.writeFileSync(jsonOutputPath, JSON.stringify(jsonData, null, 4), 'utf8');

console.log('Excel file successfully converted to JSON!');
