const fs = require("fs");

fs.mkdir("./newFolder", function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Created newFolder");
  }
});

const func = (data) => {
  if (fs.existsSync("./newFolder/text.txt")) {
    console.log("Datei existiert bereits");
  } else {
    fs.appendFile("./newFolder/text.txt", data, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Created text.txt");
      }
    });
  }
};

func("Das hat funktioniert");
