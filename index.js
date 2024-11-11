import express from "express";
import axios from "axios";

const app = express();
const port = 3001;
const API_URL = "https://secrets-api.appbrewery.com/";
const yourUsername = "dkozakiewicz";
const yourPassword = "Potaspotas1*";
const yourAPIKey = "8c645876-4762-461f-88de-219998406338";
const yourBearerToken = "f902f62d-ccc3-4dbf-b8cd-f4a709681d1a";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(
      "https://secrets-api.appbrewery.com/random"
    );
    var content = JSON.stringify(response.data);
    res.render("index.ejs", { content });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      content: error.message,
    });
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get(
      "https://secrets-api.appbrewery.com/all?page=2",
      {
        auth: {
          username: yourUsername,
          password: yourPassword,
        },
      }
    );
    var content = JSON.stringify(response.data);
    res.render("index.ejs", { content });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      content: error.message,
    });
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get(
      `https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`
    );
    var content = JSON.stringify(response.data);
    res.render("index.ejs", { content });
  } catch {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      content: error.message,
    });
  }
});

app.get("/bearerToken", async (req, res) => {
  try {
    const response = await axios.get(
      "https://secrets-api.appbrewery.com/secrets/42",
      {
        headers: {
          Authorization: `Bearer ${yourBearerToken}`,
        },
      }
    );
    var content = JSON.stringify(response.data);
    res.render("index.ejs", { content });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      content: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
