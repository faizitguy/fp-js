// procedural function

// str = "Innovation distinguishes between a leader and a follower.";
// let prepareString = function () {
//   let str1 = str.trim();
//   let str2 = str1.replace(/[?.,!]/g, "");
//   let str3 = str2.toUpperCase();
//   let arr = str3.split(" ");

//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] === "A" || arr[i] === "AN" || arr[i] === "THE") {
//       arr.splice(i, 1);
//     }
//   }
//   return arr;
// };

str = "Innovation distinguishes between a leader and a follower.";

const trim = (str) => str.replace(/^\s*|\s*$/g, "");

const noPunct = (str) => str.replace(/[?.,!]/g, "");

const capitalize = (str) => str.toUpperCase();

const breakout = (str) => str.split(" ");

const noArticles = (str) => str !== "A" && str !== "AN" && str !== "THE";

const filterArticles = (arr) => arr.filter(noArticles);

//console.log(filterArticles(breakout(capitalize(noPunct(trim(str))))));

const pipe = function (...fns) {
  return function (x) {
    return fns.reduce(function (v, f) {
      return f(v);
    }, x);
  };
};

// const compose = function (...fns) {
//   return function (x) {
//     return fns.reduceRight(function (v, f) {
//       return f(v);
//     }, x);
//   };
// };

const prepareString = pipe(trim, noPunct, capitalize, breakout, filterArticles);

/*const prepareString = compose(
    filterArticles, 
    breakout, 
    capitalize, 
    noPunct, 
    trim);*/

console.log(prepareString(str));
