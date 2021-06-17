// convert the impure functions to pure functions which don't have any side effects
// var currentUser = 0;
var users = [
  { name: "James", score: 30, tries: 1 },
  { name: "Mary", score: 110, tries: 4 },
  { name: "Henry", score: 80, tries: 3 },
];

// var updateScore = function (newAmt) {
//   users[currentUser].score += newAmt;
// };

// var updateTries = function () {
//   users[currentUser].tries++;
// };
// var updateUser = function (newUser) {
//   currentUser = newUser;
// };

// --------------- problem statement ending ------------------------

// it is not possible to convert every function to pure since we should have to modify data at some time
// so we will write both pure and impure functions but mostly trying to write pure functions

// modifies data (impure functions)
const storeUser = function (arr, user) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name === user.name) {
      arr[i] = user;
      break;
    }
  }
};

// pure functions

const getUser = function (arr, name) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name === name) {
      return arr[i];
    }
  }
  return null;
};

const updateScore = function (user, newAmt) {
  if (user) {
    user.score = newAmt;
    return user;
  }
};

const updateTries = function (user) {
  if (user) {
    user.tries++;
    return user;
  }
};

let user = getUser(users, "Henry");
let updateUserScore = updateScore(user, 30);
let updateUserTries = updateTries(updateUserScore);
storeUser(updateUserTries);

console.log(users);
