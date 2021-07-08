// composing functors

// const { Task, Either } = require("./lib/types");

// const Compose = (F, G) => {
//   const M = (fg) => ({
//     extract: () => fg,
//     map: (f) => M(fg.map((g) => g.map(f))),
//   });
//   M.of = (x) => M(F.of(G.of(x)));
//   return M;
// };

// const TaskEither = Compose(Task, Either);

// TaskEither.of(2)
//   .map((two) => two * 10)
//   .map((twenty) => twenty + 1)
//   .extract()
//   .fork(console.error, (either) => either.fold(console.log, console.log));
// 21

// ================================================================
// monad transformers are not the prettiest thing they don't have a well founded theory and math
// are just like a way to get through this problem
// we'll look at free monads which have a well founded theory
// by the above example we found that functors can be composed but monads do not

// const { TaskT, Task, Either } = require("./lib/types");
// const { Left, Right } = Either;
// const _ = require("loadash");

// console.log(_, "loadash");
// const users = [
//   { id: 1, name: "faiz" },
//   { id: 2, name: "ahmed" },
//   { id: 3, name: "khan" },
// ];

// const following = [
//   { user_id: 1, follow_id: 3 },
//   { user_id: 1, follow_id: 2 },
//   { user_id: 2, follow_id: 1 },
// ];

// const find = (table, query) =>
//   Task.of(Either.fromNullable(_.find(table, query)));

// const app = () =>
//   find(users, { id: 1 }) // Task(Either(User))
//     .chain((eu) =>
//       eu.fold(Task.rejected, (u) => find(following, { follow_id: u.id }))
//     )
//     .chain((eu) =>
//       eu.fold(Task.rejected, (fo) => find(users, { id: fo.user_id }))
//     )
//     .fork(console.error, (eu) => eu.fold(console.error, console.log));

// app();

// let's do it in a more better way by transoformer

// const TaskEither = TaskT(Either);

// task transformer created a new task much like compose created a new type that knew how to map
// and it knows how to change chain but it is specific to each monad
// each monad should have
// you can just define the transformer and recover the original type just by applying it to the identity functor.

// we can use .lift where it wraps the next either or monad into prev and make it as one part

// ===================================================================================

// Reconstructing with monad transfomers

// const { FnT, TaskT, Task, Either, EitherT } = require("./lib/types");

// const FnTask = FnT(Task);
// const App = Either(FnTask);

// App :: Either(Fn(Task))

// const res = App.of(2).map((x) => x + 1);
// res.fold(console.error, (fn) =>
//   fn.run({ myEnv: true }).fork(console.error, console.log)
// );

// App.of(2)
//   .chain((two) => App.lift(TaskEither.of(two + two)))
//   .chain((four) => App.lift(TsakEither.lift(Either.of(four))))
//   .chain((four) => App.lift(Task.of(four).map(Either.of)))
//   .run({})
//   .fork(console.log, (fi) => fi.fold(console.log, console.log));

// It's best to stay shallow without tons of type help

// monad transformers practice (assignment)

// setup

// const Fn = (g) => ({
//   map: (f) => Fn((x) => f(g(x))),
//   chain: (f) => Fn((x) => f(g(x)).run(x)),
//   run: g,
// });
// Fn.ask = Fn((x) => x);
// Fn.of = (x) => Fn(() => x);

// const FnT = (M) => {
//   const Fn = (g) => ({
//     map: (f) => Fn((x) => g(x).map(f)),
//     chain: (f) => Fn((x) => g(x).chain((y) => f(y).run(x))),
//     run: g,
//   });
//   Fn.ask = Fn((x) => M.of(x));
//   Fn.of = (x) => Fn(() => M.of(x));
//   Fn.lift = (x) => Fn(() => x);
//   return Fn;
// };

// const Either = (() => {
//   const Right = (x) => ({
//     chain: (f) => f(x),
//     ap: (other) => other.map(x),
//     alt: (other) => Right(x),
//     extend: (f) => f(Right(x)),
//     concat: (other) =>
//       other.fold(
//         (x) => other,
//         (y) => Right(x.concat(y))
//       ),
//     traverse: (of, f) => f(x).map(Right),
//     map: (f) => Right(f(x)),
//     fold: (_, g) => g(x),
//     toString: () => `Right(${x})`,
//   });

//   const Left = (x) => ({
//     chain: (_) => Left(x),
//     ap: (_) => Left(x),
//     extend: (_) => Left(x),
//     alt: (other) => other,
//     concat: (_) => Left(x),
//     traverse: (of, _) => of(Left(x)),
//     map: (_) => Left(x),
//     fold: (f, _) => f(x),
//     toString: () => `Left(${x})`,
//   });

//   const of = Right;
//   const tryCatch = (f) => {
//     try {
//       return Right(f());
//     } catch (e) {
//       return Left(e);
//     }
//   };

//   const fromNullable = (x) => (x != null ? Right(x) : Left(x));

//   return { Right, Left, of, tryCatch, fromNullable };
// })();

// const EitherT = (M) => {
//   const Right = (mx) => ({
//     extract: () => mx,
//     chain: (f) => Right(mx.chain((x) => f(x).extract())),
//     map: (f) => Right(mx.map(f)),
//     fold: (_, g) => g(mx),
//   });

//   const Left = (mx) => ({
//     chain: (_) => Left(mx),
//     map: (_) => Left(mx),
//     fold: (h, _) => h(mx),
//   });

//   const of = (x) => Right(M.of(x));
//   const tryCatch = (f) => {
//     try {
//       return Right(M.of(f()));
//     } catch (e) {
//       return Left(e);
//     }
//   };

//   const lift = Right;

//   return { of, tryCatch, lift, Right, Left };
// };

// const Task = (fork) => ({
//   fork,
//   map: (f) => Task((rej, res) => fork(rej, (x) => res(f(x)))),
//   chain: (f) => Task((rej, res) => fork(rej, (x) => f(x).fork(rej, res))),
// });
// Task.of = (x) => Task((rej, res) => res(x));
// Task.rejected = (x) => Task((rej, res) => rej(x));

// const TaskT = (M) => {
//   const Task = (fork) => ({
//     fork,
//     map: (f) => Task((rej, res) => fork(rej, (mx) => res(mx.map(f)))),
//     chain: (f) =>
//       Task((rej, res) =>
//         fork(rej, (mx) => mx.chain((x) => f(x).fork(rej, res)))
//       ),
//   });
//   Task.lift = (x) => Task((rej, res) => res(x));
//   Task.of = (x) => Task((rej, res) => res(M.of(x)));
//   Task.rejected = (x) => Task((rej, res) => rej(x));

//   return Task;
// };

// // Ex1:
// // =========================
// const FnEither = FnT(Either);
// const { Right, Left } = Either;

// // TODO: Use FnEither.ask to get the cfg and return the port
// const ex1 = () => FnEither.ask.map((config) => config.port);

// QUnit.test("Ex1", (assert) => {
//   const result = ex1(1)
//     .run({ port: 8080 })
//     .fold(
//       (x) => x,
//       (x) => x
//     );
//   assert.deepEqual(8080, result);
// });

// // Ex1a:
// // =========================
// const fakeDb = (xs) => ({ find: (id) => Either.fromNullable(xs[id]) });

// const connectDb = (port) =>
//   port === 8080
//     ? Right(fakeDb(["red", "green", "blue"]))
//     : Left("failed to connect");

// // TODO: Use ex1 to get the port, connect to the db, and find the id
// const ex1a = (id) =>
//   ex1()
//     .chain((port) => FnEither.lift(connectDb(port)))
//     .chain((db) => FnEither.lift(db.find(id)));

// QUnit.test("Ex1a", (assert) => {
//   assert.deepEqual(
//     "green",
//     ex1a(1)
//       .run({ port: 8080 })
//       .fold(
//         (x) => x,
//         (x) => x
//       )
//   );
//   assert.deepEqual(
//     "failed to connect",
//     ex1a(1)
//       .run({ port: 8081 })
//       .fold(
//         (x) => x,
//         (x) => x
//       )
//   );
// });

// // Ex2:
// // =========================
// const posts = [
//   { id: 1, title: "Get some Fp" },
//   { id: 2, title: "Learn to architect it" },
//   { id: 3 },
// ];

// const postUrl = (server, id) => [server, id].join("/");

// const fetch = (url) =>
//   url.match(/serverA/gi)
//     ? Task.of({ data: JSON.stringify(posts) })
//     : Task.rejected(`Unknown server ${url}`);

// const ReaderTask = FnT(Task);

// // Use ReaderTask.ask to get the server for the postUrl
// const ex2 = (id) =>
//   ReaderTask.ask.chain((server) =>
//     ReaderTask.lift(
//       fetch(postUrl(server, id))
//         .map((x) => x.data)
//         .map(JSON.parse) // <--- get the server variable from ReaderTask
//     )
//   );

// QUnit.test("Ex2", (assert) => {
//   ex2(30)
//     .run("http://serverA.com")
//     .fork(
//       (e) => console.error(e),
//       (posts) => assert.deepEqual("Get some Fp", posts[0].title)
//     );
// });

// // Ex3:
// // =========================
// const TaskEither = TaskT(Either);

// const Api1 = {
//   getFavoriteId: (user_id) =>
//     Task((rej, res) => res(user_id === 1 ? Right(2) : Left(null))),
//   getPost: (post_id) =>
//     Task((rej, res) => res(Either.fromNullable(posts[post_id - 1]))),
// };

// const Api2 = {
//   getFavoriteId: (user_id) =>
//     TaskEither((rej, res) => res(user_id === 1 ? Right(2) : Left(null))),
//   getPost: (post_id) =>
//     TaskEither((rej, res) => res(Either.fromNullable(posts[post_id - 1]))),
// };

// // TODO: Rewrite ex3 using Api2
// const ex3 = (user_id) =>
//   Api1.getFavoriteId(user_id)
//     .chain((epost_id) =>
//       epost_id.fold(
//         () => Task.of(Left()),
//         (post_id) => Api1.getPost(post_id)
//       )
//     )
//     .map((epost) => epost.map((post) => post.title));

// QUnit.test("Ex3", (assert) => {
//   ex3(1).fork(
//     (e) => console.error(e),
//     (ename) =>
//       ename.fold(
//         (error) => assert.deepEqual("fail", error),
//         (name) => assert.deepEqual("Learn to architect it", name)
//       )
//   );
// });
