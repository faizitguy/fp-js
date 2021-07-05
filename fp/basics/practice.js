const add = (x, y) => x + y;

// const toPair = (f) => (x, y) => f(x, y);

// const result = toPair(add)(2, 3);

// const curry = (f) => (x) => (y) => f(x, y);
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

function curry(fn, arity = fn.length) {
  return (function nextCurried(prevArgs) {
    return function curried(nextArg) {
      var args = [...prevArgs, nextArg];

      if (args.length >= arity) {
        return fn(...args);
      } else {
        return nextCurried(args);
      }
    };
  })([]);
}

const pipe = function (...fns) {
  return function (x) {
    return fns.reduce(function (v, f) {
      return f(v);
    }, x);
  };
};

const compose = function (...fns) {
  return function (x) {
    return fns.reduceRight(function (v, f) {
      return f(v);
    }, x);
  };
};

const getFullName = (firstName, lastName) => {
  const fName = firstName.trim();
  const fNameCap = fName.toUpperCase();
  const lName = lastName.trim();
  const lNameCap = lName.toUpperCase();
  const fullName = fNameCap + " " + lNameCap;
  return fullName;
};

// rewrite the code with fp

// pure functions

const capitalize = (str) => str.toUpperCase();
const trimStr = (str) => str.trim();
const joinName = (fName, lName) => fName + " " + lName;

const getName = compose(curry(joinName)("faiz"), capitalize, trimStr);
const res = getName("khan");
console.log(res);
