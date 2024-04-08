const fs = require("fs");

const dobleNumber = (number, time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const multiNum = number * 2;
      resolve(multiNum);
    }, time);
  });
};

dobleNumber(3, 1000)
  .then((result) => console.log("Ergebnis:", result))
  .catch((err) => console.log("fehler:", err));

dobleNumber(7, 2000)
  .then((result) => console.log("Ergebnis:", result))
  .catch((err) => console.log("fehler:", err));
