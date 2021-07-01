const fs = require("fs");
const { Task, Either } = require("data.task");
// const { Task, Either, Id } = require("types");

const { List, Map } = require("immutable-ext");

const Right = (x) => ({
  map: (f) => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`,
});

const Left = (x) => ({
  map: (f) => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`,
});

const fromNullable = (x) => (x != null ? Right(x) : Left(null));

// const t1 = new Task((rej, res) => res(2))
//   .map((two) => two + 1)
//   .map((three) => three * 2);

// t1.fork(console.log, console.log);

// console.log(fs);

// const testUser = { id: 2, name: "user1" };

// const Db = {
//   find: (_id) => new Task((rej, res) => res(testUser)),
// };

// Db.find(4).fork(console.log, console.log);

// const httpGet = (path, params) => new Task.of(`${path} : result`);

// const getUser = (x) => httpGet("/user", { id: x });
// const getTimeline = (x) => httpGet(`/timeline/${x}`, {});
// const getAds = () => httpGet("/ads", {});

// Promise.all([getUser, getTimeline, getAds]);
// end up with promise with array of results
// Promise([result1, result1, result3])
// but if we map over that
// [getUser, getTimeline, getAds].map(f => f())
// we will end up with
// [promise1, promsie2, promise3]
// [promise1, promsie2, promise3] ||   Promise([result1, result1, result3])
// list of primises || a promise of lists

// a list of tasks || a task of lists => that interface is called traversable
// we're able to traverse the types, kind of leapfrog them, flip them around

// List([getUser, getTimeline, getAds])
//   .traverse(Task.of, (f) => f())
//   .fork(console.log, (x) => console.log(x.toJS()));

// traverse takes two arguments
// first one is point Task.of and second is function invokation

// [ '/user : result', '/timeline/undefined : result', '/ads : result' ] // result

// so it's effectively a Task over a list of results, instead of a list of Tasks

const greaterThan5 = (x) =>
  x.length > 5 ? Right(x) : Left("not greater than 5");

const looksLikeEmail = (x) =>
  x.match(/@/gi) ? Right(x) : Left("not an email");

const email = "blahh@yadda.com";
const res = List([greaterThan5, looksLikeEmail]).traverse(Either.of, (v) =>
  v(email)
);

res.fold(console.log, console.log);
