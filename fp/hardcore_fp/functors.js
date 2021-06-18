const Box = (x) => ({
  map: (f) => Box(f(x)),
});

const nextCharForNumberString = (str) => {
  const trimmed = str.trim();
  const number = parseInt(trimmed);
  const nextNumber = Number(number + 1);
  return String.fromCharCode(nextNumber);
};

// const result = nextCharForNumberString(" 65 ");

const result = () =>
  ["a"].map((x) => x.toUpperCase()).map((x) => String.fromCharCode(x));

console.log(result);

// things aren't so dot chainable out of the box
