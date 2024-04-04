export {
  first,
  last,
  lastBack,
  sliceFirst,
  output,
  secondOutput,
  total,
  random,
  upper,
  allUpper,
  same,
};

const first = (arr) => {
  return arr[0];
};

const last = (arr) => {
  return [...arr].slice(0, -1);
};

const lastBack = (arr) => {
  return arr[arr.length - 1];
};

const sliceFirst = (arr) => {
  return [...arr].slice(1);
};

const output = (arr) => {
  return arr.filter((item) => item !== "remove");
};

const secondOutput = (arr) => {
  return [...new Set(arr)];
};

const total = (arr) => {
  return arr.reduce((acc, curr) => acc + curr);
};

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const upper = (word) => {
  return word[0].toUpperCase() + word.slice(1);
};

const allUpper = (word) => {
  return word.toUpperCase();
};

const same = (first, second) => {
  if (first.slice(-1) === second.slice(-1)) return true;
  else {
    return false;
  }
};
