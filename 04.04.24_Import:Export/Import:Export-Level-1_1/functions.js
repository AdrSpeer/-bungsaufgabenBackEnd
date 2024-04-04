const sortNumber = (arr) => {
  return [...arr].sort((a, b) => a - b);
};

const sortString = (arr) => {
  return [...arr].sort();
};

export { sortNumber, sortString };
