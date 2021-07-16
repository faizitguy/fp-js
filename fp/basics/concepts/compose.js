// // procedural function

// // str = "Innovation distinguishes between a leader and a follower.";
// // let prepareString = function () {
// //   let str1 = str.trim();
// //   let str2 = str1.replace(/[?.,!]/g, "");
// //   let str3 = str2.toUpperCase();
// //   let arr = str3.split(" ");

// //   for (let i = 0; i < arr.length; i++) {
// //     if (arr[i] === "A" || arr[i] === "AN" || arr[i] === "THE") {
// //       arr.splice(i, 1);
// //     }
// //   }
// //   return arr;
// // };

// str = "Innovation distinguishes between a leader and a follower.";

// const trim = (str) => str.replace(/^\s*|\s*$/g, "");

// const noPunct = (str) => str.replace(/[?.,!]/g, "");

// const capitalize = (str) => str.toUpperCase();

// const breakout = (str) => str.split(" ");

// const noArticles = (str) => str !== "A" && str !== "AN" && str !== "THE";

// const filterArticles = (arr) => arr.filter(noArticles);

// //console.log(filterArticles(breakout(capitalize(noPunct(trim(str))))));

// const prepareString = pipe(trim, noPunct, capitalize, breakout, filterArticles);

// /*const prepareString = compose(
//     filterArticles,
//     breakout,
//     capitalize,
//     noPunct,
//     trim);*/

// console.log(prepareString(str));

function checkLength(string) {
  let str1 = string.trim();
  let str2 = string.split(" ");
  let len = str2.length;
  return len;
}

const trim = (str) => str.trim();
const split = (str) => str.split(" ");
const check = (arr) => arr.length;

console.log(check(split(trim("Let's analyze how many you typed"))));

// console.log(checkLength("Faiz Ahmed Khan"));

const arr = [1, 2, 3, 4, 5];

const doubleIt = arr.map((n) => n + n);
const filterIt = doubleIt.filter((n) => n > 5);
const totalIt = filterIt.reduce((ac, v) => ac + v);

const newRes = arr
  .map((n) => n + n)
  .filter((n) => n > 5)
  .reduce((ac, v) => ac + v);

console.log(newRes, "newRes");
console.log(arr, "arr");
console.log(doubleIt, "map");
console.log(filterIt, "filter");
console.log(totalIt, "reduce");
