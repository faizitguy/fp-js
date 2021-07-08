const { Either } = require("./lib/types");
const { List } = require("immutable-ext");

const toUpper = (x) => x.toUpperCase();
const exclaim = (x) => x.concat("!");

// here instead of modeling a type of data and data inside that type
// we will model a function (run)
// and then we're able to combine functions

// let's suppose if we want to combine this functions in different ways
// model them and do interesting things with them

// const Fn = (run) => ({
//   run,
//   chain: (f) => Fn((x) => f(run(x)).run(x)),
//   map: (f) => Fn((x) => f(run(x))),
//   concat: (other) => Fn((x) => run(x).concat(other.run(x))),
// });

// concat run both functions and combine the results

// const res = Fn(toUpper).concat(Fn(exclaim)).run("Fp sux"); //FP SUXFp sux!

// here we runned the two functions and concated the results
// this is the starting to form the basis of what we call the reader monad
// we're actually modelling a function itself

// console.log(res);

// we've run two functions and we've concated the results

// what does it mean to make function a monad => it talks about nesting
// I have a function within a function which each function takes some arguments
// and we wanna flatten this two functions into one function that's what monad's do

// Fn((x) => Fn((y) => x, y));
// const res = Fn(toUpper)
//   .chain((upper) => Fn((y) => exclaim(upper)))
//   .run("hi");
// console.log(res);

// ===================================================================================

// The Reader Monad

// const Fn = (run) => ({
//   run,
//   chain: (f) => Fn((x) => f(run(x)).run(x)),
//   map: (f) => Fn((x) => f(run(x))),
//   concat: (other) => Fn((x) => run(x).concat(other.run(x))),
// });

// we've unnested it by taking a second argument by passing it in
// and if the second argument here is just high again
// we gave it x and processed it and passed in the transformed x

// we'll get the original x
// getting the original value doesn't seem very useful upfront but it will allow us
// to do thread kind of invisible environment through our whole program
// that's why we call it reader
// x wasn't transoformed through it is just carried through and we can just gain access to it whenever we want
// so you start transforming our input can still get back to its kind of original.

// Fn.of = (x) => Fn(() => x);

// const res = Fn(toUpper)
//   .chain((upper) => Fn((x) => [upper, exclaim(x)]))
//   .run("hi");

// const res = Fn.of("hello")
//   .map(toUpper)
//   .chain((upper) => Fn((x) => [upper, exclaim(x)]))
//   .run("hi"); //  [ 'HELLO', 'hi!' ]
// Fn.ask = Fn((x) => x);

// const res = Fn.of("hello")
//   .map(toUpper)
//   .chain((upper) => Fn.ask.map((config) => [upper, config]))
//   .run("hi"); //  [ 'HELLO', 'hi!' ]

// console.log(res);

// this is function monad and it is insanely helpful during function architecture

// ===================================================================================

// The Endo Functor

// what if we would rahter instead of combining functions by running both and then combining the results
// we can do this by making a composition like function composition as concatination

// const Fn = (run) => ({
//   run,
//   chain: (f) => Fn((x) => f(run(x)).run(x)),
//   map: (f) => Fn((x) => f(run(x))),
//   concat: (other) => Fn((x) => run(x).concat(other.run(x))),
// });

// Fn.of = (x) => Fn(() => x);
// Fn.ask = Fn((x) => x);

// [toUpper, exclaim].foldMap(Endo, Endo.empty());
// hello => HELLO!
// it should gonna run through a pipeline of functions and new composition
// The reason it's called ENDO which is weird is because this only works with endomorphisms
// means it only works from types a to a, string to string, task to task
// it has the same input as output
// and the reason for that is because we know we can just compose them without running into any type
// problems where they don't compose

// const Endo = (run) => ({
//   run,
//   concat: (other) => Endo((x) => run(other.run(x))),
// });

// Endo.empty = () => Endo((x) => x);

// const res = List([toUpper, exclaim]).foldMap(Endo, Endo.empty()).run("hello");
// // hello => HELLO!
// console.log(res);

// ================================================================

// contramap

// contravariant functors are functors that operate on their first value
// so we have  a function from a to string (a -> string)
// and we know that it will always return us a string
// we can take in any a to begin with. we can map over the a and turn it into b but it always end up  on a string

// we can do this with sort function, perdicate functions (they take in anything and return only boolean value)
// sorting functions return enum of -1, 0, 1

// this is kindaa like a super power
// let's define it with the name Reducer find it below

// (acc, a) => acc

// const Reducer = (run) => ({
//   run,
//   contramap: (f) => Reducer((acc, x) => run(acc, f(x))),
// });

// Reducer(login)
//   .conact(Reducer(changePage))
//   .contramap((pay) => pay.currentPage)
//   .run(state, { user: {}, currentPage: {} });

// contramap hits arguments before it comes in
// purpose of contramap is to keep the entire paylaod going through the system, but plucking thigns off
// and passing it into inner functions
// it's just one usecase of contramap
// it's almost like a before hook
// whereas map would be like an after hook
// it gives us the ability to kind of get in there and change the argument before it arrives.
// it's also useful in situations where you have a fixed output and the fixed output is static,
// but the input is not you're able to pre-compose instead of post compose to be able to build out applications

// ====================================================================

// function modelling practice assignment

// Definitions
// const Endo = (run) => ({
//   run,
//   concat: (other) => Endo((x) => other.run(run(x))),
// });

// Endo.empty = () => Endo((x) => x);

// // Ex1:
// // =========================

// const classToClassName = (html) => html.replace(/class\=/gi, "className=");

// const updateStyleTag = (html) => html.replace(/style="(.*)"/gi, "style={{$1}}");

// const htmlFor = (html) => html.replace(/for=/gi, "htmlFor=");

// const ex1 = (html) =>
//   // htmlFor(updateStyleTag(classToClassName(html))) //rewrite using Endo
//   Endo(htmlFor)
//     .concat(Endo(updateStyleTag))
//     .concat(Endo(classToClassName))
//     .run(html);

// // here we are capturing function composition via monoids
// // since the functions always return the same input and same output type
// // we can effortlessly compose the types
// // we can also alternatively do like below by using list and foldMap

// // const ex1 = html =>
// // List.of([htmlFor, updateStyleTag, classToClassName]).foldMap(Endo, Endo.empty()).run(html)

// // Ex2: model a predicate function :: a -> Bool and give it contramap() and concat(). i.e. make the test work
// // =========================
// const Pred = (run) => ({
//   run,
//   contramap: (f) => Pred((x) => run(f(x))),
//   concat: (other) => Pred((x) => run(x) && other.run(x)),
// });

// // Ex3:
// // =========================
// const extension = (file) => file.name.split(".")[1];

// const matchesAny = (regex) => (str) => str.match(new RegExp(regex, "ig"));

// const matchesAnyP = (pattern) => Pred(matchesAny(pattern)); // Pred(str => Bool)

// // TODO: rewrite using matchesAnyP. Take advantage of contramap and concat
// const ex3 = (file) =>
//   // matchesAny('txt|md')(extension(file)) && matchesAny('functional')(file.contents)
//   matchesAnyP("txt|md")
//     .contramap(extension)
//     .concat(matchesAnyP("functional").contramap((f) => f.contents))
//     .run(file);

// ======================================================

// Function Modeling Equivalances

const Reducer = (run) => ({
  run,
  contramap: (f) => Reducer((acc, x) => run(acc, f(x))),
  concat: (other) => Reducer((acc, x) => other.run((acc, x), x)),
});

const checkCards = (email, pass) => email === "admin" && pass === 123;

const login = (state, payload) =>
  payload.email
    ? Object.assign({}, state, {
        loggedIn: checkCards(payload.email, payload.pass),
      })
    : state;

const setPrefs = (state, payload) =>
  payload.prefs ? Object.assign({}, state, { prefs: payload.prefs }) : state;

const reducer = Reducer(login).concat(Reducer(setPrefs));

const state = { loggedIn: false, prefs: {} };
const payload = { email: "admin", pass: 123, prefs: { bgColor: "#000" } };
console.log(reducer.run(state, payload));
