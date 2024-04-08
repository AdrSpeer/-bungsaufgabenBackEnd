const fs = require("fs");

const randomNumber = () => {
  return new Promise((resolve, reject) => {
    resolve(Math.floor(Math.random() * 10) + 1);
  });
};

randomNumber().then((result) => {
  return new Promise((resolve, reject) => {
    if (result < 6) reject(result);
    resolve(result);
  })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log("Fehler, weil die Zahl kleiner als 6 ist:", err);
    });
});
