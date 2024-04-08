const randomTimeOut = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 1000) + 1);
    }, time);
  });
};

Promise.all([randomTimeOut(3000), randomTimeOut(5000), randomTimeOut(6000)])
  .then((results) => {
    console.log("Ergebnisse:", results);
  })
  .catch((err) => {
    console.log("Fehler:", err);
  });
