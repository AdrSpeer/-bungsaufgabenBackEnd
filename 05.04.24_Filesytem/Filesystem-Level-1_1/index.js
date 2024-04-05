const fs = require("fs");

fs.readFile("./blog1.txt", function (err, data) {
  if (err) {
    console.log(err);
  } else {
    fs.writeFile("./blog1.txt", "Ich bin ein Webdeveloper", function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Text changed");
      }
    });
  }
});

fs.appendFile("appendfile.txt", "Neuer Ordner erstellt", function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Appendfile added");
  }
});

if (fs.existsSync("./assets/")) {
  fs.rmdir("./assets/", { recursive: true }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Der Ordner 'assets' wurde gelöscht.");
    }
  });
} else {
  console.log("Der Ordner 'assets' existiert nicht.");
}

if (fs.existsSync("./delet.txt")) {
  fs.unlink("./delet.txt", (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Datei delet.txt wurde gelöscht");
    }
  });
} else {
  console.log("Datei nicht vorhanden");
}

fs.appendFile("./delet.txt", "", function (err) {
  if (err) {
    console.log("creating delet.txt failed");
  } else {
    console.log("created delet.txt");
  }
});

fs.appendFile("./Hello.txt", "Hallo, wie gehts", function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Added Hello.txt");
  }
});

fs.rename("./Hello.txt", "./HelloWorld.txt", function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Changed name to HelloWorld");
  }
});
