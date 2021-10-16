import express from "express";
import fs from "fs";

const PORT = process.env.PORT || 3000;
const app = express();

async function startApp() {
  try {
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
    //create folder 'static' where was save counter data file
    const dir = "./static";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    //Run counter
    app.get("/hello", (req, res) => {
      try {
        let counter = JSON.parse(fs.readFileSync("./static/count.json"));
        res.json(counter);
        counter++;
        fs.writeFileSync("./static/count.json", JSON.stringify(counter));
      } catch {
        fs.appendFile("./static/count.json", "0", function (err) {
          if (err) throw err;
          console.log("File is created successfully.");
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
}

startApp();
