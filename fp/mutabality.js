// const name = "faiz";
// name = "ahmed"; // type error
"use strict";

// const arr = [3, 1, 4, 8, 6, 2];

// Object.freeze(arr); // not allows to do changes again

// const sortArray = function (arr) {
//   return arr.sort();
// };

// const newArr = sortArray(arr);

// console.log(newArr); // [ 1, 2, 3, 4, 6, 8 ]
// console.log(arr); // [ 1, 2, 3, 4, 6, 8 ]

// objects are mutable

// freeze method which makes the object immutable
// when you pass an object to Object.freeze() it locks down the properties and prevents you
//  from adding new properties or deleting existing properties

// we can clone objects by using Object.assgin(objectName)

var obj = {
  fName: "faiz",
  lName: "khan",
  score: 85,
  completed: true,
  questions: {
    q1: {
      done: true,
      value: 1,
    },
    q2: {
      done: false,
      value: 1,
    },
  },
};

const obj2 = Object.assign(obj);
obj2.questions.q1.value = 5;

const obj3 = JSON.parse(JSON.stringify(obj));
obj3.questions.q1.value = 10;

console.log(obj);
console.log(obj2);
console.log(obj3);
