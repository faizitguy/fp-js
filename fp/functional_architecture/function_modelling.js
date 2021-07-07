const { Either } = require("./lib/types");

const toUpper = (x) => x.toUpperCase();
const exclaim = (x) => x.concat("!");

// here instead of modeling a type of data and data inside that type
// we will model a function (run)
// and then we're able to combine functions

// let's suppose if we want to combine this functions in different ways
// model them and do interesting things with them

// const Fn = (run) => ({
//   run,
//   chain: (f) => Fn((x) => f(run(x)).run(x)),
//   map: (f) => Fn((x) => f(run(x))),
//   concat: (other) => Fn((x) => run(x).concat(other.run(x))),
// });

// concat run both functions and combine the results

// const res = Fn(toUpper).concat(Fn(exclaim)).run("Fp sux"); //FP SUXFp sux!

// here we runned the two functions and concated the results
// this is the starting to form the basis of what we call the reader monad
// we're actually modelling a function itself

// console.log(res);

// we've run two functions and we've concated the results

// what does it mean to make function a monad => it talks about nesting
// I have a function within a function which each function takes some arguments
// and we wanna flatten this two functions into one function that's what monad's do

// Fn((x) => Fn((y) => x, y));
// const res = Fn(toUpper)
//   .chain((upper) => Fn((y) => exclaim(upper)))
//   .run("hi");
// console.log(res);

// ===================================================================================

// The Reader Monad

// const Fn = (run) => ({
//   run,
//   chain: (f) => Fn((x) => f(run(x)).run(x)),
//   map: (f) => Fn((x) => f(run(x))),
//   concat: (other) => Fn((x) => run(x).concat(other.run(x))),
// });

// we've unnested it by taking a second argument by passing it in
// and if the second argument here is just high again
// we gave it x and processed it and passed in the transformed x

// we'll get the original x
// getting the original value doesn't seem very useful upfront but it will allow us
// to do thread kind of invisible environment through our whole program
// that's why we call it reader
// x wasn't transoformed through it is just carried through and we can just gain access to it whenever we want
// so you start transforming our input can still get back to its kind of original.

// Fn.of = (x) => Fn(() => x);

// const res = Fn(toUpper)
//   .chain((upper) => Fn((x) => [upper, exclaim(x)]))
//   .run("hi");

// const res = Fn.of("hello")
//   .map(toUpper)
//   .chain((upper) => Fn((x) => [upper, exclaim(x)]))
//   .run("hi"); //  [ 'HELLO', 'hi!' ]
// Fn.ask = Fn((x) => x);

// const res = Fn.of("hello")
//   .map(toUpper)
//   .chain((upper) => Fn.ask.map((config) => [upper, config]))
//   .run("hi"); //  [ 'HELLO', 'hi!' ]

// console.log(res);

// this is function monad and it is insanely helpful during function architecture

// ===================================================================================
// The Endo Functor

const Fn = (run) => ({
  run,
  chain: (f) => Fn((x) => f(run(x)).run(x)),
  map: (f) => Fn((x) => f(run(x))),
  concat: (other) => Fn((x) => run(x).concat(other.run(x))),
});

Fn.of = (x) => Fn(() => x);
Fn.ask = Fn((x) => x);
