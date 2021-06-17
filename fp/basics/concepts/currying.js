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

const ffun = function (a, b, c) {
  return a + b + c;
};

const gfun = function (d, e) {
  return d + e;
};

const hfun = function (f, g, h) {
  return f + g + h;
};

/*const curriedF = curry(ffun);
const curriedG = curry(gfun);
const curriedH = curry(hfun);

const newFun = pipe (
    curriedF(1)(2),
    curriedG(4),
    curriedH(5)(6));*/

const newFun = pipe(curry(ffun)(1)(2), curry(gfun)(4), curry(hfun)(5)(6));

console.log(newFun(1));

const doubleNum = function (num) {
  return num + num;
};

const totalIt = function (n1, n2, n3, n4) {
  return n1 + n2 + n3 + n4;
};

const doArray = function (num1, num2) {
  return [num1, num2];
};

const newFunction = pipe(
  doubleNum,
  curry(totalIt)(3)(2)(1),
  curry(doArray)(50)
);

// console.log(newFunction(10));
