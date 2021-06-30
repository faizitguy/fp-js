// task is like a promise

// const { compose } = require("ramda");
// import { Task } from "types";
// const { Task } = require("types");

const { Task } = require("./task_code");

// const Box = (f) => ({
//   map: (g) => Box(compose(f, g)),
//   fold: f,
// });

// Box(() => 2)
//   .map((two) => two + 3)
//   .fold();

// Task.of(2).map((two) => two + 2); // Task(2)

const t1 = Task((res, rej) => res(2).map((two) => two + 1)).map(
  (three) => three * 2
);

console.log(t1);
