// let count = 0;

// function with side effect
// let increment = function () {
//   count++;
//   return count;
// };

// function without side effect
// let increment = function (num) {
//   return num + 1;
// };

// side effect is the observable change outside the function
// whenever we change a value from outside world or interact with outside world beyond our function scope
// it causes side effects
// disadvantages
// => difficult to predict the outcome of the code
// => harder to debug
// => harder to test

// var x = 1;
// fun1();
// console.log(x);
// fun2();
// console.log(x);
// fun3();
// console.log(x);

// what will be the value of x
// since there are some functions in between logging we need to check if they are donig any side effects or not
// if they are not doing any side effecs then the value will be constant

// var MAINAPP = (function (nsp) {
//   var currentUser = 0;
//   users = [
//     { name: "James", score: 30, tries: 1 },
//     { name: "Mary", score: 110, tries: 4 },
//     { name: "Henry", score: 80, tries: 3 },
//   ];

//   var updateScore = function (newAmt) {
//     users[currentUser].score += newAmt;
//   };

//   var returnUsers = function () {
//     return users;
//   };

//   var updateTries = function () {
//     users[currentUser].tries++;
//   };
//   var updateUser = function (newUser) {
//     currentUser = newUser;
//   };

//   nsp.updateUser = updateUser;
//   nsp.updateTries = updateTries;
//   nsp.updateScore = updateScore;
//   nsp.returnUsers = returnUsers;
//   return nsp;
// })(MAINAPP || {});

// setTimeout(function () {
//   MAINAPP.updateUser(2);
// }, 300);

// setTimeout(function () {
//   MAINAPP.updateScore(20);
// }, 100);

// setTimeout(function () {
//   MAINAPP.updateTries();
// }, 200);
