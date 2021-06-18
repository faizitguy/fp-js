// properties

// associative
// add(add(x,y), z) => add(x, add(y,z))

// (1+2) + 3 => 1 + (2+3)

// commutative
// add(x,y) => add(y,x)
// (1+2) => (2+1)

//identity
// add(x,0) => x
// (1+0) => 1

// distributive
// add(muliply(x,y), multiply(x,z)) => multiply(x, add(y,z))
// ((1*2) + (1*3)) => (1 * (2+3))

// this is just an example of some like actual calculation function.
// we are gonna be running our entire program in terms of these calculation functions

// const add = (x, y) => x + y;
// functions take one put and give you one output

// add([1, 2]);
// add(1, 2);

// let us prove that giving a pair as a single argument is same as giving multiple arguments

// const toPair =
//   (f) =>
//   ([x, y]) =>
//     f(x, y);

// const fromPair = (f) => (x, y) => f(x, y);

// const result = toPair(add)([1, 2]);
// const result2 = fromPair(add)(1, 2);

// console.log(result); // 2
// console.log(result2); // 2

// hence it is proved that giving a pair as a single argument is same as giving multiple arguments

// let us prove the commutative property by flipping the arguments

// const flip = (f) => (y, x) => x + y;

// const result = flip(add)(1, 3);
// console.log(result);

// currying

// const curry = (f) => (x) => (y) => f(x, y);

const { curry, pipe } = require("ramda");
// const curriedAdd = curry(add);

// const increment = curriedAdd(1);
// const result = increment(3);
// console.log(result); // 4

// what curry did here is it allows you to give add (a function) or an argument and it REMEMBERS it
// so then it is just waiting for it's 'y'

// we can curry any function we can take any function of multiple arguments and make it take one argument at a time

// const modulo = curry((x, y) => y % x);

// const isOdd = modulo(2);

// const result = isOdd(2);

// console.log(result); // 0

// when to use currying

// we already know that we can flip arguments, we can take all it once, we can take one parameter at a time
// choose currying when you have to remember an argument and pass that around

// const modulo = curry((x, y) => y % x);

// const isOdd = modulo(2);

// const filter = curry((f, xs) => xs.filter(f));

// const getOdds = filter(isOdd);

// const result = getOdds([1, 2, 3, 4, 5]);
// console.log(result); // [1,3,5]

// partial application

// one more example of piping

// const add = curry((x, y) => x + y);

// const double = (x) => x + x;

// const addExtra = curry((x, y) => x + y);

// const subtract = curry((x, y) => y - x);

// const getResult = pipe(add(5), double, addExtra(5), subtract(10));

// console.log(getResult(5));

const replaceIt = curry((regex, replacement, str) =>
  str.replace(regex, replacement)
);

const replaceVowels = replaceIt(/[AEIOU]/gi, "!");

const result = replaceVowels("I have words haha");
console.log(result);
