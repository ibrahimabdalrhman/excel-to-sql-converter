# Excel to SQL Converter

This repository contains a Node.js script designed to convert data from Excel files into SQL insert statements for database entry. It simplifies the process of importing large datasets from Excel sheets into a database by converting them into a JSON format, transforming the data, and generating SQL statements.

## Features

- **Excel to JSON Conversion**: Converts Excel files into JSON format.
- **JSON Transformation**: Enhances and adds metadata to JSON data.
- **SQL Generation**: Converts JSON data into SQL `INSERT` statements.
- **API Integration**: Fetches additional metadata from an API to enrich the data.

## Prerequisites

- Node.js (v16 or higher)
- NPM or Yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ibrahimabdalrhman/excel-to-sql-converter.git
   cd excel-to-sql-converter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### 1. Excel to JSON Conversion

Convert an Excel file to JSON:

```bash
node convertExcelToJson.js
```

- The script reads the Excel file specified in the `excelFilePath` variable and outputs the JSON to `outputOfExcel.json`.

### 2. Enrich JSON Data

Transform and enrich JSON data:

```bash
node transformJson.js
```

- The script reads `output.json`, adds additional fields, and saves the result in `result.json`.

### 3. Generate SQL Statements

Generate SQL `INSERT` statements:

```bash
node jsonToSql.js
```

- The script reads `result.json` and outputs SQL insert statements to `sqlFile.txt`.

## Files

### 1. `convertExcelToJson.js`

This script converts an Excel file into a JSON file.

### 2. `transformJson.js`

This script enriches the JSON data with additional fields, including audio file paths, metadata, and more, using API data.

### 3. `jsonToSql.js`

This script converts the enriched JSON data into SQL `INSERT` statements.

## Example Workflow

1. Place your Excel file in the root directory.
2. Run the scripts in the following order:
   - `convertExcelToJson.js`
   - `transformJson.js`
   - `jsonToSql.js`
3. Use the generated SQL file (`sqlFile.txt`) to import data into your database.

## Configuration

- Update file paths in the scripts as needed.
- Set the API URL in `transformJson.js`.

## Example Output

### Excel to JSON

Input Excel file (`surah2.xlsx`):
```plaintext
| Ayah number | Hidaya word | Hidaya Text |
|-------------|-------------|-------------|
| 1           | كلمة         | نص           |
```

Output JSON (`outputOfExcel.json`):
```json
[
    {
        "Ayah number": 1,
        "Hidaya word": "كلمة",
        "Hidaya Text": "نص"
    }
]
```

### JSON to SQL

Output SQL file (`sqlFile.txt`):
```sql
INSERT INTO hidaya 
(hidaya_id, ayah_id, word_ar, word_en, text_ar, text_en, audio, page_number, tag_id, sent, sent_at)
VALUES
(166, 1, "كلمة", "word", "نص", "text", "/audio/surah/002001.mp3", 1, 1, 1, "2024-02-10 05:05:01"),
(...);
```

## Dependencies

- [XLSX](https://www.npmjs.com/package/xlsx): For Excel file processing.
- [Axios](https://www.npmjs.com/package/axios): For API calls.
- [FS (File System)](https://nodejs.org/api/fs.html): For reading and writing files.

## License

This project is licensed under the MIT License.

## Contribution

Feel free to submit issues or pull requests to enhance this project. The scripts are designed to be flexible, and you can modify them to meet your specific requirements. Anyone is welcome to edit and adapt these scripts for their own needs.

