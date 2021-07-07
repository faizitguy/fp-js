const { Either } = require("./lib/types");

// const toUpper = (x) => x.toUpperCase();
// const exclaim = (x) => x.concat("!");

// let's suppose if we want to combine this functions in different ways
// model them and do interesting things with them

// const Fn = (run) => ({
//   run,
//   chain: (f) => Fn((x) => f(run(x)).run(x)),
//   map: (f) => Fn((x) => f(run(x))),
//   concat: (other) => Fn((x) => run(x).concat(other.run(x))),
// });

// const res = Fn(toUpper).concat(Fn(exclaim)).run("Fp sux"); //FP SUXFp sux!
// console.log(res);

// we've run two functions and we've concated the results

// const res = Fn(toUpper)
//   .chain((upper) => Fn((y) => exclaim(upper)))
//   .run("hi");
// console.log(res);

// ===================================================================================
