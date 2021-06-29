const add = (x, y) => x + y;

// const toPair = (f) => (x, y) => f(x, y);

// const result = toPair(add)(2, 3);

const curry = (f) => (x) => (y) => f(x, y);
// const curriedAdd = curry(add);
// const increment = curriedAdd(1);
// const result = increment(2);
// console.log(result);
// we can take any function of multiple arguments and make it take a one argument at a time

// argument order

// const modulo = curry((x, y) => y % x);
// const isOdd = modulo(2);

// const filter = curry((f, xs) => xs.filter(f));

// const getOdds = filter(isOdd);

// const result = getOdds([13, 64, 4, 3, 5, 6]);

// console.log(result);

// ramds generalized currying

// compose

// const compose = (f, g) => (x) => f(g(x));

// const pipe = (f, g) => (x) => g(f(x));

// const toUpper = (str) => str.toUpperCase();

// const first = (str) => str[0];

// const exclaim = (str) => str + "!";

// const loudShout = compose(first, toUpper);
// const exclaimStr = compose(exclaim, loudShout);

// const result = exclaimStr("faiz");
// console.log(result);
