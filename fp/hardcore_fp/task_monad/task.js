// task is like a promise

// const { compose } = require("ramda");
// import { Task } from "types";
// const { Task } = require("types");

const { Task } = require("data.type");

// const Box = (f) => ({
//   map: (g) => Box(compose(f, g)),
//   fold: f,
// });

// Box(() => 2)
//   .map((two) => two + 3)
//   .fold();

// Task.of(2).map((two) => two + 2); // Task(2)

const t1 = Task((rej, res) => res(2).map((two) => two + 1)).map(
  (three) => three * 2
);

t1.fork(console.error, console.log);
