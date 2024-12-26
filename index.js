const fs = require("fs");
const axios = require("axios");

const apiUrl = "https://serveapis.hidayaa.info/surah/2/ayah";

async function fetchData() {
  try {
    const response = await axios.get(apiUrl);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}



const jsonFilePath = "./output.json";
const outputFilePath = "./result.json"; // Changed file extension to .json

fs.readFile(jsonFilePath, "utf8", async (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  try {
    const jsonData = JSON.parse(data);

    let hidayaId = 166;
    const dataFromApi = await fetchData();
    if (!dataFromApi) {
      console.error("Failed to fetch API data.");
      return;
    }

    for (let i = 0; i < jsonData.length; i++) {
      // Add keys to each object
      jsonData[i]["hidaya_id"] = hidayaId++;
      jsonData[i]["word_ar"] = jsonData[i]["Hidaya word"];
      jsonData[i]["word_en"] = jsonData[i]["Hidaya word"];
      jsonData[i]["text_ar"] = jsonData[i]["Hidaya Text"];
      jsonData[i]["text_en"] = jsonData[i]["Hidaya Text"];

      jsonData[i]["tag_id"] = 1;
      jsonData[i]["sent"] = 1;
      jsonData[i]["page_number"] = 1;
      jsonData[i]["sent_at"] = "2024-02-10 05:05:01";

      if (jsonData[i]["Ayah number"] > 0 && jsonData[i]["Ayah number"] < 10) {
        jsonData[i]["audio"] = `/audio/surah/00200${jsonData[i]["Ayah number"]}.mp3`;
      } else if (
        jsonData[i]["Ayah number"] >= 10 &&
        jsonData[i]["Ayah number"] < 100
      ) {
        jsonData[i]["audio"] = `/audio/surah/0020${jsonData[i]["Ayah number"]}.mp3`;
      } else {
        jsonData[i]["audio"] = `/audio/surah/002${jsonData[i]["Ayah number"]}.mp3`;
      }

      dataFromApi.ayah.some((element) => {
        if (jsonData[i]["Ayah number"] == element.ayah_number) {
          console.log(`hidaya_id: ${jsonData[i]["hidaya_id"]}  `, element.ayah_id);
          jsonData[i]["ayah_id"] = element.ayah_id;
          return true; // Breaks the loop
        }
      });
    }

    // Write the result as JSON
    fs.writeFile(outputFilePath, JSON.stringify(jsonData, null, 4), "utf8", (writeErr) => {
      if (writeErr) {
        console.error("Error writing to file:", writeErr);
        return;
      }
      console.log(`Results successfully written to ${outputFilePath}`);
    });
  } catch (parseErr) {
    console.error("Error parsing JSON:", parseErr);
  }
});




