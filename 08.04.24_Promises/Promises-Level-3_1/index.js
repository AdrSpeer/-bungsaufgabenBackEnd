const fs = require("fs");

const multiNumber = (number) => {
  return new Promise((resolve, reject) => {
    const multiResult = number * number;
    resolve(multiResult);
  });
};

const chainMultiNumber = (number) => {
  multiNumber(number)
    .then((result) => multiNumber(result))
    .then((result1) => multiNumber(result1))
    .then((result2) => console.log("Ergebnis:", result2))
    .catch((err) => console.log("Fehler:", err));
};

chainMultiNumber(3);

chainMultiNumber(6);

// multiNumber(3)
//   .then((result) => {
//     return new Promise((resolve, reject) => {
//       resolve(result);
//     });
//   })
//   .then((result) => console.log(result));
