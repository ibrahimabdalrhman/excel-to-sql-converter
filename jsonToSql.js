const fs = require("fs");

const jsonFile = "./result.json";
const sqlFile = "./sqlFile.txt";

fs.readFile(jsonFile, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading JSON file:", err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);
    let resultText = `INSERT INTO hidaya 
    (hidaya_id, ayah_id, word_ar, word_en, text_ar, text_en, audio, page_number, tag_id, sent, sent_at)
    VALUES\n`;

    // (NULL, 1, 'كلمة بالعربية', 'word in English', 'نص بالعربية', 'text in English', 'audio.mp3', 5, 10, 1, '2024-12-24 12:00:00');
    

    // Loop through JSON data to format as text
    jsonData.forEach((item) => {
        resultText += "(";
      resultText += `${item.hidaya_id},`;
      resultText += `${item.ayah_id},`;
      resultText += `"${item.word_ar}",`;
      resultText += `"${item.word_en}",`;
      resultText += `"${item.text_ar}",`;
      resultText += `"${item.text_en}",`;
      resultText += `"${item.audio}",`;
      resultText += `${item.page_number},`;
      resultText += `${item.tag_id},`;
      resultText += `${item.sent},`;
      resultText += `"${item.sent_at}"`;
      resultText += `), \n`;
    });

    // Write the formatted text to the .txt file
    fs.writeFile(sqlFile, resultText, "utf8", (writeErr) => {
      if (writeErr) {
        console.error("Error writing to text file:", writeErr);
        return;
      }
      console.log(`Converted JSON data successfully written to ${sqlFile}`);
    });
  } catch (parseErr) {
    console.error("Error parsing JSON data:", parseErr);
  }
});
