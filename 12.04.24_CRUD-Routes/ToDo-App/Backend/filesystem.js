import fs from "fs";
import url from "url";
import path from "path";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export function readJsonFile(path) {
  return new Promise((res, rej) => {
    fs.readFile(path, (err, dataBuffer) => {
      if (err) return rej(err);
      const jsonString = dataBuffer.toString();
      const jsObj = JSON.parse(jsonString);
      res(jsObj);
    });
  });
}

export function readToDo() {
  return readJsonFile(__dirname + "/data/toDo.json");
}

export function writeJsonFile(path, jsObj) {
  return new Promise((res, rej) => {
    const jsonString = JSON.stringify(jsObj, null, 2);
    fs.writeFile(path, jsonString, (err) => {
      if (err) return rej(err);
      res(jsObj);
    });
  });
}

export function writeToDo(toDoArray) {
  return writeJsonFile(__dirname + "/data/toDo.json", toDoArray);
}
