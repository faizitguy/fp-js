const { liftF, Task } = require("./lib/types");
const { Id } = require("./lib/types");
const { taggedSum } = require("daggy");

// free monads are usually not what we want but they solve a very specific problem and it's good to
// know about
// we talked about monad transformer stacks and we've talked about free monads
// we've talked about reader type injections
// reader injection through ask or dependency injection through ask

// what is a free monad

// The free monad is a way to take your functions and treat them like data types.

// const httpGet = (url) => HttpGet(url);

// so we have a function like httpGet and it takes some arguments like url
// instead of going and making a task and trying to like go do this function right now
// we can actually return a data type like httpGet(url) httpGet holding a url
// so we have a datatype now that represents going to get a URL
// and the reason we want to be a monad is because we want to say
// well, I have this data type, and I want to chain

// const httpGet = (url) =>
//   httpGet(url).chain((contents) => HttpPost("/analytics", contents));

// and then what we should end up with is a data structure representing
// the nested tree of computation
// we're basically building an AST (Abstract Syntax Tree)

// we're lifting our functions into data types
// treating them as if they're running and then we're able to interpret them later

// so we have to create what we call an interpreter to intrepret our data structure

// let's build it right here now
// let's take up a library called daggy
// daggy all it does is this whole entire class like we're making stuff like HttpGet
// it takes some value takes some x and returns as a data type and we've methods on it
// it allows us to shoreter syntax for defining the objects
// and then it give us to decompose a set of different types

const Http = taggedSum("Http", { Get: ["url"], Post: ["url", "body"] });
// const res = Http.Get("/home"); // { url: '/home' }
// console.log(res);
// it is just like a little data type for our own usage
// it is a shorter syntax for big object literals

// we can actually run a catamorphism on it and it will pattern match on what data type it is
// and it will allow us to destructure the type and do something to it
// it's like a little type creation library

// Get.Get("/home").cata({
//   Get: (url) => "get",
//   Post: (url, body) => "post",
// });

// we've a liftF helping function here it lifts it into free

const httpGet = (url) => liftF(Http.Get(url));
const httpPost = (url, body) => liftF(Http.Post(url, body));

const app = () =>
  httpGet("/home").chain((contents) => httpPost("/analytics", contents));

// free monads nothing but a data type and it just normalizes everything
// we can chain and compose and do whatever we want

const interpret = (x) =>
  x.cata({
    Get: (url) => Id.of(`contents for ${url}`),
    Post: (url, body) => Id.of(`posted ${body} to ${url}`),
  });
const res = app().foldMap(interpret, Id.of);
console.log(res);
