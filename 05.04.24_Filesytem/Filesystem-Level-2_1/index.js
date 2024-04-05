const fs = require("fs");

fs.appendFile("./data.json", "", function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Created data.json");
  }
});

fs.readFile("./data.json", "utf8", function (err, data) {
  if (err) {
    console.log(err);
  } else {
    const JsonData = JSON.parse(data);
    let textContent = "";
    JsonData.forEach((item) => {
      textContent += `${item.id} - ${item.title}\n`;
      textContent += `${item.description}\n\n`;
    });
    fs.writeFile("./data.txt", textContent, function (err) {
      if (err) {
        console.log("Failed create data.txt");
      } else {
        console.log("created data.txt");
      }
    });
  }
});
