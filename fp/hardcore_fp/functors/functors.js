// const Box = (x) => ({
//   map: (f) => Box(f(x)),
//   inspect: `Box(${x})`,
//   fold: (f) => f(x),
// });

const { filter } = require("ramda");

// // const result = nextCharForNumberString(" 64 ");

// // const result = ["a"]
// //   .map((x) => x.toUpperCase())
// //   .map((x) => String.fromCharCode(x));
// // console.log(result);

// // const result = Box("a")
// //   .map((x) => x.toUpperCase())
// //   .map((x) => String.fromCharCode(x))
// //   .map((x) => x[0]);

// // things aren't so dot chainable out of the box

// const nextCharForNumberString_ = (str) => {
//   const trimmed = str.trim();
//   const number = parseInt(trimmed);
//   const nextNumber = Number(number + 1);
//   return String.fromCharCode(nextNumber);
// };

// // rewrite the above function with dot chaining

// const nextCharForNumberString = (str) =>
//   Box(str)
//     .map((x) => x.trim())
//     .map((trimmed) => parseInt(trimmed))
//     .map((number) => Number(number + 1))
//     .fold(String.fromCharCode);

// const result = nextCharForNumberString(" 64");
// console.log(result);

// ---------------------------------------------------------

// refactoring to dot chaining

const Box = (x) => ({
  map: (f) => Box(f(x)),
  inspect: `Box(${x})`,
  fold: (f) => f(x),
});

const first = (xs) => xs[0];

const halfTheFirstLargeNumber_ = (xs) => {
  const found = xs.filter((x) => x >= 20);
  const answer = first(found) / 2;
  return `The answer is ${answer}`;
};

const compose = (f, g) => (x) => Box(x).map(g).map(f);

const halfTheFirstLargeNumber = (xs) =>
  Box(xs)
    .map((xs) => xs.filter((x) => x >= 20))
    .map((found) => first(found) / 2)
    .fold((answer) => `The answer is ${answer}`);

const res = halfTheFirstLargeNumber([1, 4, 50]);
console.log(res);
