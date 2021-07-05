// semigroup

// 1 + 2 + 3;
// 1 + (2 + 3) = (1 + 2) + 3 => associative and closed
// if we add a bunch of integers we never break out of integers always get integers back => closed
// so it's closed under composition
// same for 1*2*3
// if it is both associative and closed then it is PARALLEL

// ===========================================
// creating semigroup dataType

// const Sum = (x) => ({
//   x,
//   concat: (other) => Sum(x + other.x),
// });

// const res = Sum(3).concat(Sum(5));
// console.log(res); // Sum(8)

// const Product = (x) => ({
//   x,
//   concat: (other) => Product(x * other.x),
// });

// const res = Product(3).concat(Product(5));
// console.log(res); // Product(15)

// const Any = (x) => ({
//   x,
//   concat: (other) => Any(x || other.x),
// });

// const res = Any(true).concat(Any(true));
// console.log(res); // true

// we've defined some of the methods above let's go little further and understand
// how this works as MONOID
// and then understand how it applies to functors

// monoids are just a semigroup with an identity

// Monoid = Semigroup + Identity

// ===================================================
// Defining Empty Identity

// Monoid = Semigroup + Identity

// we're going to call this one empty in the interface but it is an identity function

// const Product = (x) => ({
//   x,
//   concat: (other) => Product(x * other.x),
// });

// Product.empty = () => Product(1);

// const res = Product(1).concat(Product(10));
// const res = Product.empty().concat(Product(10));
// console.log(res); // 10

// const Sum = (x) => ({
//   x,
//   concat: (other) => Sum(x + other.x),
// });

// Sum.empty = () => Sum(0);

// const res = [1, 2, 3, 4, 5].map(Sum).reduce((acc, n) => acc.concat(n)); // 5
// const res = [].map(Sum).reduce((acc, n) => acc.concat(n)); //  Reduce of empty array with no initial value
// const res = [].map(Sum).reduce((acc, n) => acc.concat(n), Sum.empty()); // 0
// we have a way to proceed in our program eventhough we didn't have any data to process right now
// we can still provide some kinda value

// console.log(res);
// const { List } = require("immutable-ext");
// const All = (x) => ({
//   x,
//   concat: (other) => All(x && other.x),
// });

// All.empty = () => All(true);
// // const res = [true, true].map(All).reduce((ac, n) => ac.concat(n), All.empty());
// const res = List([true, true]).foldMap(All, All.empty());
// console.log(res);

// const Inetrsection = (x) => ({
//   x,
//   concat: (other) => Intersection(_.intersection(x, other.x)),
// });
// const res = Intersection([1, 2, 3, 4, 5]).concat(Intersection([1, 2, 3, 4, 5]));
// If we doesn't have an empty it is only a semi group,it's not a monoid

// ================================================================

// Identity Functors

// functors are monoids
// we will be using monoids and semi groups interchangeably

const { Id, Task, Either } = require("./lib/types");
const { Left, Right } = Either;
const { List } = require("immutable-ext");

const Sum = (x) => ({
  x,
  concat: (other) => Sum(x + other.x),
});

const Product = (x) => ({
  x,
  concat: (other) => Product(x * other.x),
});

const Any = (x) => ({
  x,
  concat: (other) => Any(x || other.x),
});

const All = (x) => ({
  x,
  concat: (other) => All(x && other.x),
});

// // whatever it's holding that's define it's behavior
// // if Id is holding monoid then it is monoid too

// const res = Id.of(Sum(2)).concat(Id.of(Sum(3))); // Id(Sum(5))

// // we can write one holds with another type as we want
// // it's just like straight up will cascade concating whatever this is holding with whatever this is holding.
// // we took all these different effects and made it into  the same shape
// // it's kinda layered type
// console.log(res.extract());

// ================================================================

// concat Method

// let's a concat a couple of functors together

// const res = Right("hello").concat(Right(" world")); // Right("hello world")

// const res = Right("hello").concat(Left("error")); // Left("error")

// it will short circuit everything if you hit a left anywhere in this giant associative concat
// if we're gonna fold a giant list of lefts or rights a bunch of eithers
// if you hit a left it's just going to return that as an error like
// res.fold(console.log, console.log);

// let's do it with task

// const res = Task.of("hello").concat(Task.of(" world")); // Task("hello world")

// const res = Task.of("hello").concat(Task.rejected(" error occured")); // Task("error occured")

// res.fork(console.log, console.log);

// you can frame your problem in terms of monoids always

// here in the above case we're returning if we got some error (Left)
// suppose if we want to return only all the happy cases (Rights) then we should use
// there is an interface called ALTERNATIVE that captures choice

// monoids capture choice

const Alternative = (ex) => ({
  ex,
  concat: (other) => Alternative(other.ex.isLeft ? ex : ex.concat(other.ex)),
});

// const res = Alternative(Right("hi")).concat(
//   Alternative(Right(" !!!!!")).concat(Alternative(Left("error occured")))
// );

const res = List([Right("hi"), Right(" !!!"), Left("error")]).foldMap(
  Alternative,
  Alternative(Right(""))
);

res.ex.fold(console.log, console.log);
