const fs = require("fs");

const dobleNumber = (number) => {
  return new Promise((resolve, reject) => {
    resolve(number);
  });
};

dobleNumber(3)
  .then((result) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(result * 2);
      }, 2000);
    });
  })
  .then((result) => console.log("Ergebnis:", result))
  .catch((err) => console.log("fehler:", err));

dobleNumber(7)
  .then((result) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(result * 2);
      }, 5000);
    });
  })
  .then((result) => console.log("Ergebnis:", result))
  .catch((err) => console.log("fehler:", err));
